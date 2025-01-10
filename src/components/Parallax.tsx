import type { FC, ReactNode } from 'react';
import Tilt, { ReactParallaxTiltProps } from 'react-parallax-tilt';

export type ParallaxOptions = {
  children: ReactNode;
} & ReactParallaxTiltProps;

export const Parallax: FC<ParallaxOptions> = ({ children, ...props }) => (
  <Tilt
    tiltMaxAngleX={7.5}
    tiltMaxAngleY={7.5}
    perspective={500}
    transitionSpeed={750}
    glareEnable={false}
    tiltReverse={true}
    {...props}
  >
    {children}
  </Tilt>
);
