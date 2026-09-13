import type { Period } from '@site/src/hooks/usePeriod';
import type { ComponentType, ReactNode } from 'react';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@docusaurus/useIsomorphicLayoutEffect';
import clsx from 'clsx';
import { Lifetime } from '@site/src/components/Lifetime';
import { Milestones } from '@site/src/components/Milestones';
import { Monthly } from '@site/src/components/Monthly';
import { motion } from '@site/src/helpers/reduced-motion';
import { roll } from '@site/src/helpers/roll';
import { PERIODS, usePeriod } from '@site/src/hooks/usePeriod';

const SCREENS: Record<Period, ComponentType> = {
  monthly: Monthly,
  yearly: Milestones,
  lifetime: Lifetime,
};

const ROLL = { full: '1.25rem', reduced: '0.75rem' };

const STAGE =
  'mx-auto grid h-[calc(var(--row)*3)] w-fit max-w-full [--row:2.75rem] short:[--row:2.5rem] sm:[--row:3rem]';
const LAYER =
  'col-start-1 row-start-1 transition-[opacity,translate] duration-300 ease-swift';

export const Impact = (): ReactNode => {
  const stage = useRef<HTMLDivElement>(null);
  const period = usePeriod();
  const at = PERIODS.indexOf(period);

  useIsomorphicLayoutEffect(() => {
    stage.current?.style.setProperty('--roll', motion(ROLL));
  }, []);

  return (
    <div ref={stage} className={STAGE}>
      {PERIODS.map((option, index) => {
        const Screen = SCREENS[option];

        return (
          <div
            key={option}
            inert={option !== period}
            className={clsx(LAYER, roll(index, at))}
          >
            <Screen />
          </div>
        );
      })}
    </div>
  );
};
