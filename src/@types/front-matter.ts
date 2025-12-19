export type MatterResult<T = Record<string, unknown>> = {
  data: T;
  content: string;
  isEmpty: boolean;
  matter: string;
};

export type MatterOptions = {
  delimiters?: [string, string];
};

export type Matter = <T = Record<string, unknown>>(
  input: string,
  options?: MatterOptions
) => MatterResult<T>;
