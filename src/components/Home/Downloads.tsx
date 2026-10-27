import type { ReactNode } from 'react';
import { useRoll } from '@site/src/components/Home/useRoll';
import { Name } from '@site/src/components/Name';
import { useDownloadsLabel } from '@site/src/hooks/useDownloads';

type GlyphOptions = {
  character: string;
  index: number;
};

type ClipOptions = {
  character: string;
  children: ReactNode;
  bleed?: boolean;
};

type FlipOptions = {
  index: number;
};

type SuffixOptions = {
  word: string;
  index: number;
};

const DIGITS = 10;
const COPIES = 3;

/** Three runs of the digits. The static markup already rests on the answer. */
const NUMBERS = Array.from(
  { length: DIGITS * COPIES },
  (_, index) => index % DIGITS
);

const ROW = 100 / NUMBERS.length;
const REST = DIGITS * (COPIES - 1);

const ROWS = { full: REST, reduced: DIGITS };
const SPIN = { full: ROWS.full * ROW, reduced: ROWS.reduced * ROW };
const LIFT = { full: ROWS.full * 100, reduced: ROWS.reduced * 100 };

const SCALE = { from: 'm', to: 'b' };
const FLIP = { full: 100, reduced: 75 };

const Clip = ({ character, children, bleed }: ClipOptions): ReactNode => (
  <span className='relative inline-block'>
    <span className='invisible'>{character}</span>
    <span
      className={`absolute inset-0 ${bleed ? 'overflow-y-clip' : 'overflow-hidden'}`}
    >
      {children}
    </span>
  </span>
);

const Digit = ({ character, index }: GlyphOptions): ReactNode => {
  const strip = useRoll(SPIN, index);
  const target = Number(character);

  return (
    <Clip character={character}>
      <span
        className='block'
        style={{ transform: `translateY(-${(REST + target) * ROW}%)` }}
      >
        <span
          ref={strip}
          className='block'
          style={{ transform: `translateY(${SPIN.full}%)` }}
        >
          {NUMBERS.map((number, position) => (
            <span key={`roll:${position}`} className='block'>
              <Name stroke>{String(number)}</Name>
            </span>
          ))}
        </span>
      </span>
    </Clip>
  );
};

const Separator = ({ character, index }: GlyphOptions): ReactNode => {
  const glyph = useRoll(LIFT, index);

  return (
    <Clip character={character}>
      <span ref={glyph} className='block'>
        <Name stroke>{character}</Name>
      </span>
    </Clip>
  );
};

const Flip = ({ index }: FlipOptions): ReactNode => {
  const strip = useRoll(FLIP, index, { clearProps: 'transform' });

  return (
    <Clip character={SCALE.to} bleed>
      <span ref={strip} className='relative block'>
        <span className='absolute right-[-0.04em] bottom-full'>
          <Name stroke>{SCALE.from}</Name>
        </span>
        <Name stroke>{SCALE.to}</Name>
      </span>
    </Clip>
  );
};

const Suffix = ({ word, index }: SuffixOptions): ReactNode => {
  if (!word.startsWith(SCALE.to)) return <Name stroke>{word}</Name>;

  return (
    <>
      <span className='sr-only'>{word}</span>
      <span aria-hidden='true'>
        <Flip index={index} />
        <Name stroke>{word.slice(SCALE.to.length)}</Name>
      </span>
    </>
  );
};

export const Downloads = (): ReactNode => {
  const downloads = useDownloadsLabel();
  const [amount, suffix] = downloads.split(' ');

  return (
    <Name stroke>
      {'Mais de '}
      <span className='font-featured tabular-nums'>
        <span className='sr-only'>{amount}</span>
        <span aria-hidden='true'>
          {[...amount].map((character, index) =>
            /^\d$/.test(character) ? (
              <Digit
                key={`digit:${index}`}
                character={character}
                index={index}
              />
            ) : (
              <Separator
                key={`separator:${index}`}
                character={character}
                index={index}
              />
            )
          )}
        </span>
      </span>{' '}
      <Suffix word={suffix} index={amount.length + 1} />
    </Name>
  );
};
