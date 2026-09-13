import type { PartnershipType } from '@site/src/components/Partners/draft';
import type { ReactNode } from 'react';
import { Chips } from '@site/src/components/Chips';
import { PARTNERSHIP_TYPES } from '@site/src/components/Partners/draft';

type TypeChipsOptions = {
  value: PartnershipType | '';
  onChange: (type: PartnershipType) => void;
};

const OPTIONS = PARTNERSHIP_TYPES.map((type) => ({ id: type, label: type }));

export const TypeChips = ({ value, onChange }: TypeChipsOptions): ReactNode => (
  <Chips
    label='Tipo de parceria'
    options={OPTIONS}
    value={value}
    onChange={onChange}
  />
);
