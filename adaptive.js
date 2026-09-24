// Renders the two dynamic views: "Generator" (free random practice) and
// "Review" (spaced-repetition review session driven by srs.js).

const adaptiveState = {
  view: "generator", // "generator" | "review"
  generatorTopicId: LESSONS[0].id,
  generatorStats: { correct: 0, total: 0 },
  reviewQueue: [],
  reviewIndex: 0,
  reviewResults: [],
  reviewActive: false
};

function normalizeAdaptive(str) {
  return normalize(str); // reuse app.js's normalize()
}

// Renders one exercise into `container`; calls onAnswered(isCorrect) exactly once.
function renderStandaloneExercise(container, exercise, onAnswered) {
  container.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "exercise";

  const q = document.createElement("div");
  q.className = "q";
  q.textContent = exercise.q;
  wrap.appendChild(q);

  function finish(isCorrect, disableTargets) {
    if (wrap.dataset.answered === "true") return;
    wrap.dataset.answered = "true";
    wrap.classList.add(isCorrect ? "correct" : "incorrect");
    const correctAnswer = exercise.answer !== undefined ? exercise.answer : exercise.answers[0];
    feedback.textContent = isCorrect ? "Correct!" : `Not quite. Correct answer: "${correctAnswer}"`;
    feedback.classList.add(isCorrect ? "correct-text" : "incorrect-text");
    disableTargets.forEach(el => el.disabled = true);
    onAnswered(isCorrect);
  }

  if (exercise.type === "mc") {
    const opts = document.createElement("div");
    opts.className = "options";
    const buttons = [];
    exercise.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "opt";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        if (wrap.dataset.answered === "true") return;
        const isCorrect = normalizeAdaptive(opt) === normalizeAdaptive(exercise.answer);
        btn.classList.add(isCorrect ? "selected-correct" : "selected-incorrect");
        finish(isCorrect, buttons);
      });
      buttons.push(btn);
      opts.appendChild(btn);
    });
    wrap.appendChild(opts);
  } else {
    const row = document.createElement("div");
    row.className = "fill-row";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Answer...";
    const submitBtn = document.createElement("button");
    submitBtn.className = "submit";
    submitBtn.textContent = "Check";
    const submit = () => {
      const isCorrect = exercise.answers.some(a => normalizeAdaptive(a) === normalizeAdaptive(input.value));
      finish(isCorrect, [input, submitBtn]);
    };
    input.addEventListener("keydown", e => { if (e.key === "Enter") submit(); });
    submitBtn.addEventListener("click", submit);
    row.appendChild(input);
    row.appendChild(submitBtn);
    wrap.appendChild(row);
    setTimeout(() => input.focus(), 0);
  }

  const feedback = document.createElement("div");
  feedback.className = "feedback";
  wrap.appendChild(feedback);

  container.appendChild(wrap);
}

// ---------- Generator view ----------

function renderGeneratorView() {
  const view = document.getElementById("lesson-view");
  view.innerHTML = "";

  const h2 = document.createElement("h2");
  h2.textContent = "Exercise Generator";
  view.appendChild(h2);

  const summary = document.createElement("p");
  summary.className = "summary";
  summary.textContent = "Random exercises drawn from a large pool per topic — no fixed order.";
  view.appendChild(summary);

  const bar = document.createElement("div");
  bar.className = "lesson-summary-bar";
  const stats = adaptiveState.generatorStats;
  bar.textContent = `This session: ${stats.correct}/${stats.total} correct`;
  view.appendChild(bar);

  const picker = document.createElement("select");
  picker.className = "topic-picker";
  LESSONS.forEach(l => {
    const opt = document.createElement("option");
    opt.value = l.id;
    opt.textContent = l.title;
    if (l.id === adaptiveState.generatorTopicId) opt.selected = true;
    picker.appendChild(opt);
  });
  picker.addEventListener("change", () => {
    adaptiveState.generatorTopicId = picker.value;
    showNextGeneratorExercise();
  });
  view.appendChild(picker);

  const exerciseHost = document.createElement("div");
  exerciseHost.className = "exercises";
  exerciseHost.id = "generator-exercise-host";
  view.appendChild(exerciseHost);

  const nextBtn = document.createElement("button");
  nextBtn.className = "submit";
  nextBtn.style.marginTop = "16px";
  nextBtn.textContent = "Next Exercise →";
  nextBtn.addEventListener("click", showNextGeneratorExercise);
  view.appendChild(nextBtn);

  showNextGeneratorExercise();
}

function showNextGeneratorExercise() {
  const host = document.getElementById("generator-exercise-host");
  if (!host) return;
  const picked = pickExercise(adaptiveState.generatorTopicId);
  if (!picked) return;
  renderStandaloneExercise(host, picked.exercise, isCorrect => {
    adaptiveState.generatorStats.total += 1;
    if (isCorrect) adaptiveState.generatorStats.correct += 1;
    recordAnswer(picked.topicId, isCorrect);
    const bar = document.querySelector(".lesson-summary-bar");
    if (bar) bar.textContent = `This session: ${adaptiveState.generatorStats.correct}/${adaptiveState.generatorStats.total} correct`;
  });
}

// ---------- Review (SRS) view ----------

function allTopicIds() {
  return LESSONS.map(l => l.id);
}

function topicTitle(id) {
  const t = getTopic(id);
  return t ? t.title : id;
}

function renderReviewView() {
  adaptiveState.reviewActive = false;
  const view = document.getElementById("lesson-view");
  view.innerHTML = "";

  const h2 = document.createElement("h2");
  h2.textContent = "Review";
  view.appendChild(h2);

  const summary = document.createElement("p");
  summary.className = "summary";
  summary.textContent = "Spaced repetition: topics you're unsure about come up more often.";
  view.appendChild(summary);

  const dueIds = getDueTopics(allTopicIds());
  const allStates = getAllTopicStates(allTopicIds());

  if (dueIds.length === 0) {
    const done = document.createElement("div");
    done.className = "explanation";
    const soonest = allStates.slice().sort((a, b) => a.dueDate < b.dueDate ? -1 : 1)[0];
    done.innerHTML = `<p><strong>All done for today! ✓</strong></p>
      <p>Next review due: ${soonest ? soonest.dueDate : "-"} (${soonest ? topicTitle(soonest.id) : ""})</p>`;
    view.appendChild(done);
  } else {
    const startBtn = document.createElement("button");
    startBtn.className = "submit";
    startBtn.textContent = `Start Review (${dueIds.length} topic${dueIds.length === 1 ? "" : "s"} due)`;
    startBtn.addEventListener("click", () => startReviewSession(dueIds));
    view.appendChild(startBtn);
  }

  const table = document.createElement("table");
  table.className = "srs-table";
  const header = document.createElement("tr");
  header.innerHTML = "<th>Topic</th><th>Due date</th><th>Accuracy</th>";
  table.appendChild(header);
  allStates.forEach(s => {
    const row = document.createElement("tr");
    const acc = s.totalCount ? Math.round((s.correctCount / s.totalCount) * 100) + "%" : "—";
    const isDue = dueIds.includes(s.id);
    row.innerHTML = `<td>${topicTitle(s.id)}${isDue ? ' <span class="due-badge">due</span>' : ""}</td><td>${s.dueDate}</td><td>${acc}</td>`;
    table.appendChild(row);
  });

  const tableWrap = document.createElement("div");
  tableWrap.className = "table-scroll";
  tableWrap.style.marginTop = "24px";
  tableWrap.appendChild(table);
  view.appendChild(tableWrap);
}

function startReviewSession(dueIds) {
  adaptiveState.reviewQueue = buildSessionQueue(dueIds, Math.min(8, Math.max(5, dueIds.length * 2)));
  adaptiveState.reviewIndex = 0;
  adaptiveState.reviewResults = [];
  adaptiveState.reviewActive = true;
  renderReviewSessionStep();
}

function renderReviewSessionStep() {
  const view = document.getElementById("lesson-view");
  view.innerHTML = "";

  const h2 = document.createElement("h2");
  h2.textContent = "Review";
  view.appendChild(h2);

  const progress = document.createElement("p");
  progress.className = "summary";
  progress.textContent = `Exercise ${adaptiveState.reviewIndex + 1} of ${adaptiveState.reviewQueue.length}`;
  view.appendChild(progress);

  const exerciseHost = document.createElement("div");
  exerciseHost.className = "exercises";
  view.appendChild(exerciseHost);

  const current = adaptiveState.reviewQueue[adaptiveState.reviewIndex];
  const topicLabel = document.createElement("p");
  topicLabel.className = "lesson-summary-bar";
  topicLabel.textContent = topicTitle(current.topicId);
  exerciseHost.appendChild(topicLabel);

  const exerciseSlot = document.createElement("div");
  exerciseHost.appendChild(exerciseSlot);

  renderStandaloneExercise(exerciseSlot, current.exercise, isCorrect => {
    recordAnswer(current.topicId, isCorrect);
    adaptiveState.reviewResults.push(isCorrect);

    const nextBtn = document.createElement("button");
    nextBtn.className = "submit";
    nextBtn.style.marginTop = "16px";
    nextBtn.textContent = adaptiveState.reviewIndex + 1 < adaptiveState.reviewQueue.length ? "Next →" : "Show Results";
    nextBtn.addEventListener("click", () => {
      adaptiveState.reviewIndex += 1;
      if (adaptiveState.reviewIndex < adaptiveState.reviewQueue.length) {
        renderReviewSessionStep();
      } else {
        renderReviewSummary();
      }
    });
    view.appendChild(nextBtn);
  });
}

function renderReviewSummary() {
  const view = document.getElementById("lesson-view");
  view.innerHTML = "";

  const h2 = document.createElement("h2");
  h2.textContent = "Session Complete";
  view.appendChild(h2);

  const correct = adaptiveState.reviewResults.filter(Boolean).length;
  const total = adaptiveState.reviewResults.length;

  const summary = document.createElement("div");
  summary.className = "explanation";
  summary.innerHTML = `<p><strong>${correct}/${total} correct</strong></p>
    <p>Your schedule has been updated — weaker topics will come up again soon, solid ones later.</p>`;
  view.appendChild(summary);

  const backBtn = document.createElement("button");
  backBtn.className = "submit";
  backBtn.textContent = "Back to Overview";
  backBtn.addEventListener("click", renderReviewView);
  view.appendChild(backBtn);
}
