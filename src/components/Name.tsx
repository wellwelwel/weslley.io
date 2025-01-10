import type { FC } from 'react';

type NameOptions = {
  name: string;
};

const Name: FC<NameOptions> = ({ name }) =>
  name.split('').map((char, i) => (
    <span
      key={`name:${char}:${i}`}
      style={
        char.trim().length > 0
          ? ({ '--index': i } as React.CSSProperties)
          : undefined
      }
    >
      {char}
    </span>
  ));

export default Name;
