let locks = 0;

const page = (): HTMLElement | null => document.getElementById('__docusaurus');

export const hold = (): (() => void) => {
  const previousOverflow = document.body.style.overflow;
  const opener = document.activeElement;

  locks += 1;
  document.body.style.overflow = 'hidden';
  page()?.setAttribute('inert', '');

  return () => {
    locks -= 1;
    document.body.style.overflow = previousOverflow;

    if (locks === 0) page()?.removeAttribute('inert');
    if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
  };
};
