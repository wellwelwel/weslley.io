import type { RefObject } from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion } from '@site/src/helpers/reduced-motion';

type MotionOptions = {
  active: number;
  menu: boolean;
  label: RefObject<HTMLSpanElement | null>;
  panel: RefObject<HTMLDivElement | null>;
  veil: RefObject<HTMLDivElement | null>;
};

const PANEL_IN = 0.3;
const PANEL_OUT = 0.16;
const ITEM_IN = 0.26;
const ITEM_STAGGER = 0.05;
const ITEM_LEAD = 0.06;
const CURRENT_IN = 0.25;
const VEIL_IN = 0.5;
const VEIL_OUT = 0.24;
const VEIL_COVER = 142;

const TRAVEL = {
  full: {
    panelY: 10,
    panelScale: 0.96,
    itemY: 6,
    exitY: 4,
    exitScale: 0.98,
    veilStart: 0,
  },
  reduced: {
    panelY: 6,
    panelScale: 0.98,
    itemY: 4,
    exitY: 2,
    exitScale: 0.99,
    veilStart: 60,
  },
};

const circle = (radius: number): string => `circle(${radius}% at 100% 0%)`;

export const useMenuMotion = ({
  active,
  menu,
  label,
  panel,
  veil,
}: MotionOptions): void => {
  const labelled = useRef(false);
  const placed = useRef(false);

  useGSAP(
    () => {
      const marked = labelled.current;
      const travel = motion(TRAVEL);

      labelled.current = true;

      if (!marked) return;

      gsap.fromTo(
        label.current,
        { opacity: 0, y: travel.itemY },
        { opacity: 1, y: 0, duration: CURRENT_IN, ease: 'power2.out' }
      );
    },
    { dependencies: [active], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      const animated = placed.current;
      const travel = motion(TRAVEL);

      placed.current = true;

      if (!menu) {
        gsap.to(panel.current, {
          autoAlpha: 0,
          y: -travel.exitY,
          scale: travel.exitScale,
          duration: animated ? PANEL_OUT : 0,
          ease: 'power2.out',
        });

        gsap.to(veil.current, {
          autoAlpha: 0,
          clipPath: circle(travel.veilStart),
          duration: animated ? VEIL_OUT : 0,
          ease: 'power2.out',
        });

        return;
      }

      gsap
        .timeline()
        .fromTo(
          veil.current,
          { autoAlpha: 0, clipPath: circle(travel.veilStart) },
          {
            autoAlpha: 1,
            clipPath: circle(VEIL_COVER),
            duration: VEIL_IN,
            ease: 'power2.out',
          }
        )
        .fromTo(
          panel.current,
          { autoAlpha: 0, y: -travel.panelY, scale: travel.panelScale },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: PANEL_IN,
            ease: 'power3.out',
          },
          0
        )
        .fromTo(
          '[data-menu-item]',
          { autoAlpha: 0, y: -travel.itemY },
          {
            autoAlpha: 1,
            y: 0,
            duration: ITEM_IN,
            stagger: ITEM_STAGGER,
            ease: 'power2.out',
          },
          ITEM_LEAD
        );
    },
    { dependencies: [menu], scope: panel }
  );
};
