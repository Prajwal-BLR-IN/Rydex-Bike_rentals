export const countTotalDays = (x: string, y: string): number => {
  const d1 = new Date(x);
  const d2 = new Date(y);

  const timeDiff = Math.abs(d2.getTime() - d1.getTime());
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return dayDiff;
};
