const legacy = (value: string): boolean => {
  const field = document.createElement('textarea');

  field.value = value;
  field.setAttribute('readonly', '');
  field.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';

  document.body.appendChild(field);
  field.select();
  field.setSelectionRange(0, value.length);

  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    field.remove();
  }
};

export const write = (value: string): Promise<boolean> =>
  navigator.clipboard?.writeText
    ? navigator.clipboard.writeText(value).then(
        () => true,
        () => legacy(value)
      )
    : Promise.resolve(legacy(value));
