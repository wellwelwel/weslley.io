import type { Chart } from '@site/src/@types/downloads';
import type { Vars } from '@site/src/helpers/vars';
import type { PointerEvent, ReactNode } from 'react';
import { useRef, useState } from 'react';
import useIsomorphicLayoutEffect from '@docusaurus/useIsomorphicLayoutEffect';
import clsx from 'clsx';
import gsap from 'gsap';
import { HEIGHT, WIDTH } from '@site/src/helpers/stream';

type StreamOptions = {
  chart: Chart;
  reveal: boolean;
};

type Growth = {
  weight: number;
};

type Tip = {
  index: number;
  shown: boolean;
};

type TipStyle = Vars<'--at'>;

const REST: Growth = { weight: 0 };
const GROWN: Growth = { weight: 1 };

const MORPH = 0.55;

const STAGE = 'relative size-full touch-none';
const CANVAS = 'size-full overflow-visible';
const BASE = 'stroke-millions stroke-3';
const LINE = 'fill-none stroke-3 stroke-accent';
const CURSOR = 'stroke-ink/60';
const TIP =
  'pointer-events-none absolute bottom-[calc(100%+0.375rem)] left-(--at) grid -translate-x-(--at) gap-1 rounded-lg text-left bg-ink px-2.5 py-1.5 text-xs/none whitespace-nowrap shadow-[0_1px_2px_var(--shade-soft),0_12px_24px_-12px_var(--shade-deep)] transition-opacity duration-200 ease-swift select-none';

/** Lifts the curve off the baseline, from flat at 0 to full height at 1. */
const raised = (weight: number): string =>
  `matrix(1,0,0,${weight},0,${HEIGHT * (1 - weight)})`;

const FLAT = raised(REST.weight);

export const Stream = ({ chart, reveal }: StreamOptions): ReactNode => {
  const stage = useRef<HTMLDivElement>(null);
  const curve = useRef<SVGPathElement>(null);
  const growth = useRef<Growth>({ ...REST });
  const [tip, setTip] = useState<Tip>({ index: 0, shown: false });
  const { path, samples } = chart;
  const last = samples.length - 1;
  const step = WIDTH / last;
  const sample = samples[tip.index];
  const at: TipStyle = { '--at': `${(tip.index / last) * 100}%` };

  const track = ({ clientX }: PointerEvent<HTMLDivElement>) => {
    const node = stage.current;
    if (!node) return;

    const { left, width } = node.getBoundingClientRect();
    const nearest = Math.round(((clientX - left) / width) * last);
    const index = Math.min(Math.max(nearest, 0), last);

    setTip((current) =>
      current.shown && current.index === index
        ? current
        : { index, shown: true }
    );
  };

  const rest = () =>
    setTip((current) =>
      current.shown ? { ...current, shown: false } : current
    );

  useIsomorphicLayoutEffect(() => {
    const target = reveal ? GROWN : REST;
    if (growth.current.weight === target.weight) return;

    const morph = gsap.to(growth.current, {
      ...target,
      duration: MORPH,
      ease: 'power2.inOut',
      onUpdate: () =>
        curve.current?.setAttribute('transform', raised(growth.current.weight)),
    });

    return () => {
      morph.kill();
    };
  }, [reveal]);

  return (
    <div
      ref={stage}
      data-scroll=''
      onPointerMove={track}
      onPointerDown={track}
      onPointerLeave={rest}
      className={STAGE}
    >
      <svg
        aria-hidden='true'
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio='none'
        className={CANVAS}
      >
        <line
          x1={0}
          x2={WIDTH}
          y1={HEIGHT}
          y2={HEIGHT}
          vectorEffect='non-scaling-stroke'
          strokeLinecap='round'
          className={BASE}
        />

        {tip.shown && (
          <line
            x1={tip.index * step}
            x2={tip.index * step}
            y1={0}
            y2={HEIGHT}
            vectorEffect='non-scaling-stroke'
            className={CURSOR}
          />
        )}

        <path
          ref={curve}
          d={path}
          transform={FLAT}
          vectorEffect='non-scaling-stroke'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={LINE}
        />
      </svg>

      <div
        aria-hidden='true'
        style={at}
        className={clsx(TIP, tip.shown ? 'opacity-100' : 'opacity-0')}
      >
        <span className='text-paper/65'>{sample.label}</span>
        <span className='font-bold text-paper tabular-nums'>
          {sample.bridged && '≈ '}
          {sample.value}
        </span>
      </div>
    </div>
  );
};
