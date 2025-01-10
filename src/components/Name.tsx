import React from 'react';

type NameOptions = {
  name: string;
};

const Name: React.FC<NameOptions> = ({ name }) =>
  name
    .split('')
    .map((char, i) => <span key={`name:${char}:${i}`}>{char}</span>);

export default Name;
