export const whenIdle = (callback: () => void): (() => void) => {
  if (typeof window.requestIdleCallback !== 'function') {
    const handle = window.setTimeout(callback, 1);

    return () => window.clearTimeout(handle);
  }

  const handle = window.requestIdleCallback(callback, { timeout: 1500 });

  return () => window.cancelIdleCallback(handle);
};
