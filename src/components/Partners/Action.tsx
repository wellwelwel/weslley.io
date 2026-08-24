import type { TriggerOptions } from '@site/src/components/Partners/Trigger';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { PartnersTrigger } from '@site/src/components/Partners/Trigger';
import { Socials } from '@site/src/components/Socials';

export const PartnersAction = ({ open, onOpen }: TriggerOptions): ReactNode => {
  const [social, setSocial] = useState<string | null>(null);

  return (
    <div className='flex flex-col items-center justify-center gap-3 short-wide:flex-row'>
      <PartnersTrigger
        open={open}
        onOpen={onOpen}
        social={social}
        onRestore={() => setSocial(null)}
      />
      <Socials onHover={setSocial} />
    </div>
  );
};
