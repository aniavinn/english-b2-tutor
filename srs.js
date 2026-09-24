// Lightweight SM-2 style spaced-repetition scheduler, tracked per grammar topic.
// State persists in localStorage so review scheduling survives reloads (this is the
// one piece of data we do persist — the scheduler is meaningless without memory).

const SRS_KEY = "en-b2-srs-state-v1";
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function loadSRS() {
  try {
    const raw = localStorage.getItem(SRS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveSRS(state) {
  try {
    localStorage.setItem(SRS_KEY, JSON.stringify(state));
  } catch (e) {
    // localStorage unavailable (private mode etc.) — scheduling just won't persist
  }
}

function getTopicState(state, topicId) {
  if (!state[topicId]) {
    state[topicId] = {
      repetition: 0,
      interval: 0,
      easeFactor: 2.5,
      dueDate: todayStr(),
      correctCount: 0,
      totalCount: 0,
      lastSeen: null
    };
  }
  return state[topicId];
}

// quality: true (correct) or false (incorrect)
function recordAnswer(topicId, correct) {
  const state = loadSRS();
  const t = getTopicState(state, topicId);

  t.totalCount += 1;
  if (correct) t.correctCount += 1;
  t.lastSeen = todayStr();

  if (correct) {
    t.repetition += 1;
    if (t.repetition === 1) t.interval = 1;
    else if (t.repetition === 2) t.interval = 3;
    else t.interval = Math.round(t.interval * t.easeFactor);
    t.easeFactor = Math.min(3.0, t.easeFactor + 0.1);
  } else {
    t.repetition = 0;
    t.interval = 1;
    t.easeFactor = Math.max(1.3, t.easeFactor - 0.2);
  }

  const due = new Date();
  due.setDate(due.getDate() + t.interval);
  t.dueDate = due.toISOString().slice(0, 10);

  saveSRS(state);
  return t;
}

// Returns topics due today or overdue, sorted most-overdue/weakest first.
function getDueTopics(allTopicIds) {
  const state = loadSRS();
  const today = todayStr();
  return allTopicIds
    .map(id => ({ id, t: getTopicState(state, id) }))
    .filter(({ t }) => t.dueDate <= today)
    .sort((a, b) => {
      // Never-practiced or weakest accuracy first
      const accA = a.t.totalCount ? a.t.correctCount / a.t.totalCount : 0;
      const accB = b.t.totalCount ? b.t.correctCount / b.t.totalCount : 0;
      if (a.t.dueDate !== b.t.dueDate) return a.t.dueDate < b.t.dueDate ? -1 : 1;
      return accA - accB;
    })
    .map(x => x.id);
}

function getAllTopicStates(allTopicIds) {
  const state = loadSRS();
  return allTopicIds.map(id => ({ id, ...getTopicState(state, id) }));
}

function resetSRS() {
  saveSRS({});
}
