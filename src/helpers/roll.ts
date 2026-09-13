/** Places a stacked item by its side of the active one. */
export const roll = (index: number, at: number): string => {
  if (index === at) return 'translate-x-0 opacity-100';

  return index < at
    ? '-translate-x-(--roll) opacity-0'
    : 'translate-x-(--roll) opacity-0';
};
