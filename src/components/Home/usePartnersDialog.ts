import { useCallback, useEffect, useState } from 'react';
import { partnersDialog } from '@site/src/components/Home/stages';

type PartnersDialog = {
  partners: boolean;
  mounted: boolean;
  open: () => void;
  close: () => void;
  settle: () => void;
};

export const usePartnersDialog = (search: string): PartnersDialog => {
  const [partners, setPartners] = useState(false);
  const [mounted, setMounted] = useState(false);

  const open = useCallback(() => {
    const reveal = () => {
      setMounted(true);
      setPartners(true);
    };

    if (partnersDialog.gate.ready()) return reveal();

    partnersDialog.gate.load().then(reveal, () => undefined);
  }, []);

  const close = useCallback(() => setPartners(false), []);

  const settle = useCallback(() => setMounted(false), []);

  useEffect(() => {
    if (new URLSearchParams(search).has('partners')) open();
  }, [open, search]);

  return { partners, mounted, open, close, settle };
};
