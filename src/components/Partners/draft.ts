export type PartnershipType = (typeof PARTNERSHIP_TYPES)[number];

export type Draft = {
  name: string;
  email: string;
  company: string;
  type: PartnershipType | '';
  message: string;
};

export const PARTNERSHIP_TYPES = ['Palestra', 'Workshop', 'Outros'] as const;

export const EMPTY_DRAFT: Draft = {
  name: '',
  email: '',
  company: '',
  type: '',
  message: '',
};

const KEY = 'weslley:partners-draft';

const isPartnershipType = (value: unknown): value is PartnershipType =>
  PARTNERSHIP_TYPES.some((type) => type === value);

export const saveDraft = (draft: Draft): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(draft));
  } catch {}
};

export const readDraft = (): Draft => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY_DRAFT;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return EMPTY_DRAFT;

    const value: Partial<Record<keyof Draft, unknown>> = parsed;

    return {
      name: typeof value.name === 'string' ? value.name : '',
      email: typeof value.email === 'string' ? value.email : '',
      company: typeof value.company === 'string' ? value.company : '',
      type: isPartnershipType(value.type) ? value.type : '',
      message: typeof value.message === 'string' ? value.message : '',
    };
  } catch {
    return EMPTY_DRAFT;
  }
};
