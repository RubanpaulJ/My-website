export const QUIZ_MINUTES = 5;
export const CHALLENGE_MINUTES = 10;
export const FINAL_MINUTES = 15;

export function moduleMinutes(mod) {
  return mod.lessons.reduce((t, l) => t + l.minutes, 0) + QUIZ_MINUTES + CHALLENGE_MINUTES;
}
