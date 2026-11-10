// Course progress lives entirely in the learner's browser (localStorage).
// A "progress code" lets them carry it to another device by copy/paste.

export function emptyProgress() {
  return {
    version: 1,
    learner: null,
    pos: { m: 0, s: 0 },
    lessonsDone: {},
    quiz: {},
    challenge: {},
    final: null,
    completedAt: null,
    certId: null,
    secondsSpent: 0,
    startedAt: null,
    updatedAt: null,
  };
}

export function loadProgress(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return emptyProgress();
    const data = JSON.parse(raw);
    return data && data.version === 1 ? { ...emptyProgress(), ...data } : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(key, progress) {
  try {
    localStorage.setItem(key, JSON.stringify({ ...progress, updatedAt: new Date().toISOString() }));
    return true;
  } catch {
    return false;
  }
}

export function clearProgress(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

const CODE_PREFIX = "JFY1.";

export function encodeProgress(progress) {
  const json = JSON.stringify(progress);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return CODE_PREFIX + b64;
}

export function decodeProgress(code) {
  const trimmed = (code || "").trim().replace(/\s+/g, "");
  if (!trimmed.startsWith(CODE_PREFIX)) throw new Error("This doesn't look like a Journify progress code.");
  try {
    const json = decodeURIComponent(escape(atob(trimmed.slice(CODE_PREFIX.length))));
    const data = JSON.parse(json);
    if (!data || data.version !== 1 || !data.learner) throw new Error();
    return { ...emptyProgress(), ...data };
  } catch {
    throw new Error("The progress code is incomplete or damaged. Copy it again and paste the whole code.");
  }
}

// Short, stable certificate ID derived from the learner and completion time.
export function makeCertId(courseId, learner, completedAt) {
  const input = `${courseId}|${learner.name}|${learner.email}|${completedAt}`.toLowerCase();
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 16777619) >>> 0;
    h2 = Math.imul(h2 + c, 2246822519) >>> 0;
  }
  const id = (h1.toString(36) + h2.toString(36)).toUpperCase().slice(0, 10).padEnd(10, "0");
  return `JT-${courseId.toUpperCase()}-${id}`;
}

export function formatDuration(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h === 0) return `${m} min`;
  return `${h} h ${m} min`;
}
