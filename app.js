// Session-only state: lesson scores reset on reload. The SRS schedule (srs.js)
// is the one thing that persists, since a review scheduler is meaningless without memory.
const state = {
  view: "lessons", // "lessons" | "generator" | "review"
  currentLessonIndex: 0,
  scores: {} // lessonId -> { correct: n, total: n }
};

function normalize(str) {
  return str.trim().toLowerCase()
    .replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");
}

function renderTabs() {
  const tabs = document.getElementById("view-tabs");
  tabs.innerHTML = "";
  const items = [
    { id: "lessons", label: "Lessons" },
    { id: "generator", label: "Generator" },
    { id: "review", label: "Review" }
  ];
  items.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "tab-btn" + (state.view === item.id ? " active" : "");
    btn.textContent = item.label;
    btn.addEventListener("click", () => {
      state.view = item.id;
      render();
    });
    tabs.appendChild(btn);
  });
}

function renderSidebar() {
  const list = document.getElementById("lesson-list");
  list.innerHTML = "";
  if (state.view !== "lessons") return;
  LESSONS.forEach((lesson, i) => {
    const el = document.createElement("a");
    el.className = "lesson-link" + (i === state.currentLessonIndex ? " active" : "");
    const score = state.scores[lesson.id];
    const scoreText = score ? `${score.correct}/${score.total} answered` : "not started";
    el.innerHTML = `${lesson.title}<span class="score">${scoreText}</span>`;
    el.addEventListener("click", () => {
      state.currentLessonIndex = i;
      render();
    });
    list.appendChild(el);
  });
}

function checkAnswer(exercise, exerciseEl, lessonId, selected) {
  const isCorrect = normalize(selected) === normalize(exercise.answer !== undefined ? exercise.answer : "");
  markResult(exercise, exerciseEl, lessonId, isCorrect, selected);
}

function checkFillAnswer(exercise, exerciseEl, lessonId, value) {
  const isCorrect = exercise.answers.some(a => normalize(a) === normalize(value));
  markResult(exercise, exerciseEl, lessonId, isCorrect, value);
}

function markResult(exercise, exerciseEl, lessonId, isCorrect, given) {
  if (exerciseEl.dataset.answered === "true") return; // only count once
  exerciseEl.dataset.answered = "true";
  exerciseEl.classList.add(isCorrect ? "correct" : "incorrect");

  if (!state.scores[lessonId]) state.scores[lessonId] = { correct: 0, total: 0 };
  state.scores[lessonId].total += 1;
  if (isCorrect) state.scores[lessonId].correct += 1;

  const feedback = exerciseEl.querySelector(".feedback");
  const correctAnswer = exercise.answer !== undefined ? exercise.answer : exercise.answers[0];
  feedback.textContent = isCorrect
    ? "Correct!"
    : `Not quite. Correct answer: "${correctAnswer}"`;
  feedback.classList.add(isCorrect ? "correct-text" : "incorrect-text");

  // disable inputs
  exerciseEl.querySelectorAll("button.opt, button.submit, input").forEach(el => el.disabled = true);

  renderSidebar();
}

function renderExercise(exercise, index, lessonId) {
  const wrap = document.createElement("div");
  wrap.className = "exercise";

  const q = document.createElement("div");
  q.className = "q";
  q.textContent = `${index + 1}. ${exercise.q}`;
  wrap.appendChild(q);

  if (exercise.type === "mc") {
    const opts = document.createElement("div");
    opts.className = "options";
    exercise.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "opt";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        if (wrap.dataset.answered === "true") return;
        const isCorrect = normalize(opt) === normalize(exercise.answer);
        btn.classList.add(isCorrect ? "selected-correct" : "selected-incorrect");
        checkAnswer(exercise, wrap, lessonId, opt);
      });
      opts.appendChild(btn);
    });
    wrap.appendChild(opts);
  } else if (exercise.type === "fill") {
    const row = document.createElement("div");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Answer...";
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") submitBtn.click();
    });
    const submitBtn = document.createElement("button");
    submitBtn.className = "submit";
    submitBtn.textContent = "Check";
    submitBtn.addEventListener("click", () => {
      checkFillAnswer(exercise, wrap, lessonId, input.value);
    });
    row.appendChild(input);
    row.appendChild(submitBtn);
    wrap.appendChild(row);
  }

  const feedback = document.createElement("div");
  feedback.className = "feedback";
  wrap.appendChild(feedback);

  return wrap;
}

function render() {
  renderTabs();
  renderSidebar();

  if (state.view === "generator") {
    renderGeneratorView();
    return;
  }
  if (state.view === "review") {
    renderReviewView();
    return;
  }

  const lesson = LESSONS[state.currentLessonIndex];
  const view = document.getElementById("lesson-view");
  view.innerHTML = "";

  const h2 = document.createElement("h2");
  h2.textContent = lesson.title;
  view.appendChild(h2);

  const summary = document.createElement("p");
  summary.className = "summary";
  summary.textContent = lesson.summary;
  view.appendChild(summary);

  const explanation = document.createElement("div");
  explanation.className = "explanation";
  explanation.innerHTML = lesson.explanation;
  view.appendChild(explanation);

  const exercisesSection = document.createElement("div");
  exercisesSection.className = "exercises";
  const h3 = document.createElement("h3");
  h3.textContent = "Exercises";
  exercisesSection.appendChild(h3);

  lesson.exercises.forEach((ex, i) => {
    exercisesSection.appendChild(renderExercise(ex, i, lesson.id));
  });
  view.appendChild(exercisesSection);

  const nav = document.createElement("div");
  nav.className = "nav-buttons";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "← Back";
  prevBtn.disabled = state.currentLessonIndex === 0;
  prevBtn.addEventListener("click", () => {
    state.currentLessonIndex -= 1;
    render();
    window.scrollTo(0, 0);
  });

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next →";
  nextBtn.disabled = state.currentLessonIndex === LESSONS.length - 1;
  nextBtn.addEventListener("click", () => {
    state.currentLessonIndex += 1;
    render();
    window.scrollTo(0, 0);
  });

  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);
  view.appendChild(nav);
}

render();
