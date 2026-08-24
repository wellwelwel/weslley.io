import type { Section } from '@site/src/components/Header';
import type { Theme } from '@site/src/data/slides';
import type { Vars } from '@site/src/helpers/vars';
import type { ReactNode } from 'react';
import type { RouteConfig } from 'react-router-config';
import { useEffect, useMemo, useState } from 'react';
import renderRoutes from '@docusaurus/renderRoutes';
import { matchPath, useLocation } from '@docusaurus/router';
import NotFound from '@theme/NotFound';
import clsx from 'clsx';
import { Backdrop } from '@site/src/components/Backdrop';
import { Header } from '@site/src/components/Header';
import { Hill } from '@site/src/components/Hill';
import {
  backgrounds,
  colors,
  groupOf,
  paths,
  slides,
  starts,
  steps,
  textures,
} from '@site/src/components/Home/catalog';
import { warm } from '@site/src/components/Home/gates';
import { Hero } from '@site/src/components/Home/Hero';
import { Preloads } from '@site/src/components/Home/Preloads';
import { Rail } from '@site/src/components/Home/Rail';
import { partnersDialog, talkDialog } from '@site/src/components/Home/stages';
import { Tint } from '@site/src/components/Home/Tint';
import { usePartnersDialog } from '@site/src/components/Home/usePartnersDialog';
import { useSlideshow } from '@site/src/components/Home/useSlideshow';
import { useSpots } from '@site/src/components/Home/useSpots';
import { useTalkDialog } from '@site/src/components/Home/useTalkDialog';
import { Progress } from '@site/src/components/Progress';
import { defaultBackground, groups } from '@site/src/data/slides';
import { whenIdle } from '@site/src/helpers/idle';
import { todayInBrazil } from '@site/src/helpers/today';

type PageStyle = Partial<Vars<'--tint'>>;

type HomeOptions = {
  routes: RouteConfig[];
};

type ShellOptions = {
  route: Pick<RouteConfig, 'routes'>;
};

const fallbackBackgrounds = [defaultBackground];

const BLURRED = 'scale-125 blur-[24px] saturate-150 brightness-125';

const BLURRED_SIZES = '40vw';

const THEMES: Record<Theme, string> = {
  light: '',
  dark: 'inverted',
};

const Home = ({ routes }: HomeOptions): ReactNode => {
  const { pathname, search } = useLocation();
  const [menu, setMenu] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const {
    partners,
    mounted: partnersMounted,
    open: openPartners,
    close: closePartners,
    settle: settlePartners,
  } = usePartnersDialog(search);
  const {
    talk,
    current,
    open: openTalk,
    close: closeTalk,
    settle: settleTalk,
  } = useTalkDialog(pathname);
  const { active, show, home } = useSlideshow(
    paths,
    partners || menu || talk !== null
  );
  const { page, rail, place, spots } = useSpots();
  const group = groupOf[active];
  const preview =
    hovered !== null && hovered !== active && groupOf[hovered] === group
      ? hovered
      : null;
  const focus = preview ?? active;
  const slide = slides[active];
  const {
    src: plush,
    background,
    texture,
    color,
    mark,
    hill,
    scene: Scene,
    theme = 'light',
  } = slide;
  const tint: PageStyle = { '--tint': color ?? hill };

  useEffect(
    () =>
      whenIdle(() => {
        todayInBrazil();
        warm();
        partnersDialog.gate.load().catch(() => undefined);
      }),
    []
  );

  const sections = useMemo<Section[]>(
    () =>
      groups.map(({ label }, index) => ({
        label,
        onSelect: () => show(starts[index]),
      })),
    [show]
  );

  return (
    <>
      <Preloads />

      {renderRoutes(routes)}

      <Progress value={(active + 1) / slides.length} color={mark} />

      <div
        ref={page}
        style={tint}
        className={clsx(
          'shaded relative flex h-dvh touch-pan-x touch-pinch-zoom flex-col p-5 antialiased max-sm:h-svh max-sm:pt-6 short:p-3 cramped:p-2',
          THEMES[theme]
        )}
      >
        <Backdrop
          sources={fallbackBackgrounds}
          active={background ?? defaultBackground}
          className={`fixed ${BLURRED}`}
          sizes={BLURRED_SIZES}
        />

        <Backdrop
          sources={backgrounds}
          active={background}
          className={`fixed object-bottom-right ${BLURRED}`}
          sizes={BLURRED_SIZES}
        />

        {Scene && <Scene />}

        <Tint tones={colors} active={color} />

        <div
          aria-hidden='true'
          className={clsx(
            'pointer-events-none fixed inset-0 bg-paper transition-opacity duration-700 ease-swift sm:hidden',
            background ? 'opacity-0' : 'opacity-100'
          )}
        />

        <div
          className={clsx(
            'relative flex min-h-0 flex-1 flex-col p-4 pt-0 transition-[background-color,box-shadow] duration-700 ease-swift max-sm:p-0 short:p-3 short:pt-0 sm:overflow-hidden sm:rounded-[2rem]',
            background
              ? 'bg-transparent shadow-none'
              : 'sm:bg-paper sm:shadow-[0_0_24px_rgb(255_255_255_/_0.3)]'
          )}
        >
          <Backdrop
            sources={textures}
            active={texture}
            className='absolute max-sm:fixed'
            opacity={0.25}
            priority='auto'
          />

          <Header
            sections={sections}
            steps={steps}
            active={active}
            onNavigate={show}
            menu={menu}
            partners={partners}
            onMenu={setMenu}
            onHome={home}
            onPartners={openPartners}
          />

          <main className='relative flex min-h-0 flex-1 flex-col overflow-hidden sm:rounded-t-[2.5rem] sm:rounded-b-3xl'>
            <div
              className={clsx(
                'relative mt-auto flex h-full max-h-326 flex-col sm:px-8 lg:px-14',
                plush &&
                  'pt-[clamp(1rem,7.75svh-1.75rem,3.5rem)] max-sm:pt-[clamp(0.75rem,7.75svh-2.5rem,3.5rem)] short:pt-1 cramped:pt-0'
              )}
            >
              <Hero
                slide={slide}
                index={active}
                partners={partners}
                onPartners={openPartners}
                onTalk={openTalk}
              />

              <Rail
                ref={rail}
                active={active}
                open={Boolean(plush)}
                place={place}
                onSelect={show}
                onHover={setHovered}
              />
            </div>
          </main>
        </div>

        {plush && spots[focus] !== undefined && (
          <Hill center={spots[focus]} tone={hill ?? mark} />
        )}
      </div>

      {partnersMounted && (
        <partnersDialog.View
          open={partners}
          onClose={closePartners}
          onClosed={settlePartners}
        />
      )}

      {current !== null && (
        <talkDialog.View
          slug={current}
          open={talk === current}
          onClose={closeTalk}
          onClosed={settleTalk}
        />
      )}
    </>
  );
};

const Shell = ({ route }: ShellOptions): ReactNode => {
  const { pathname } = useLocation();
  const routes = route.routes ?? [];
  const known = routes.some(({ path, exact }) =>
    matchPath(pathname, { path, exact })
  );

  return known ? <Home routes={routes} /> : <NotFound />;
};

export default Shell;
