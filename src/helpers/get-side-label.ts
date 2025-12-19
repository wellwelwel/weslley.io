export const getSideLabel = (index: number): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  let num = index;

  do {
    result = letters[num % 26] + result;
    num = Math.floor(num / 26) - 1;
  } while (num >= 0);

  return result;
};
