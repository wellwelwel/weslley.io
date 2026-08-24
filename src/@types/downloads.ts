export type Downloads = {
  year: number;
  /** Link to the file the numbers were read from. */
  source: string;
  /** Downloads of the running year, absent when the history is unreachable. */
  total?: number;
  /** Downloads of the last 365 days. */
  rolling?: number;
};
