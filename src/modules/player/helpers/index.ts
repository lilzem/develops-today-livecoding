export const formatDuration = (seconds: number) => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${pad(minutes)}:${pad(remainingSeconds)}`;
};

export const mockFunction = () => {};
