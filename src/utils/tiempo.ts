
export function formatTime(ms: number): string {
  if (ms <= 0) return '00:00.000';

  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1_000);
  const millis  = ms % 1_000;

  const mm  = String(minutes).padStart(2, '0');
  const ss  = String(seconds).padStart(2, '0');
  const mmm = String(millis).padStart(3, '0');

  return `${mm}:${ss}.${mmm}`;
}
