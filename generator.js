// Randomized exercise picker drawing from each topic's exercise pool in data.js.
// Avoids repeating the same exercise twice in a row per topic.

const lastShownIndex = {}; // topicId -> last index shown (in-memory, session-only)

function getTopic(topicId) {
  return LESSONS.find(l => l.id === topicId);
}

function pickExercise(topicId) {
  const topic = getTopic(topicId);
  if (!topic || !topic.exercises.length) return null;

  const pool = topic.exercises;
  let index;
  if (pool.length === 1) {
    index = 0;
  } else {
    do {
      index = Math.floor(Math.random() * pool.length);
    } while (index === lastShownIndex[topicId]);
  }
  lastShownIndex[topicId] = index;
  return { exercise: pool[index], topicId };
}

// Builds a queue of `count` exercises, cycling round-robin through topicIds
// (earlier topics in the list — i.e. more overdue/weaker — get first pick).
function buildSessionQueue(topicIds, count) {
  const queue = [];
  if (!topicIds.length) return queue;
  let i = 0;
  while (queue.length < count) {
    const topicId = topicIds[i % topicIds.length];
    const picked = pickExercise(topicId);
    if (picked) queue.push(picked);
    i += 1;
  }
  return queue;
}
