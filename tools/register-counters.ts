const create = async (key: string): Promise<void> => {
  try {
    await Bun.$`countty create ${key}`.quiet();
  } catch {}
};

export const registerCounters = async (keys: string[]): Promise<void> => {
  await Promise.all(
    keys.flatMap((key) => [create(key), create(`${key}:like`)])
  );
};
