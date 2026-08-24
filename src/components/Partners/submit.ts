import type { Draft } from '@site/src/components/Partners/draft';

const ENDPOINT = 'https://api.web3forms.com/submit';

const WEB3FORMS_PUBLIC_KEY = '0e430072-493e-4eba-9991-9879134fe5ef';

const isSuccess = (value: unknown): boolean =>
  typeof value === 'object' &&
  value !== null &&
  'success' in value &&
  value.success === true;

export const submit = async (draft: Draft): Promise<boolean> => {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_PUBLIC_KEY,
        botcheck: false,
        subject: 'Nova proposta de parceria: weslley.io',
        from_name: draft.name,
        name: draft.name,
        email: draft.email,
        company: draft.company,
        partnership_type: draft.type,
        message: draft.message,
      }),
    });

    return isSuccess(await response.json());
  } catch {
    return false;
  }
};
