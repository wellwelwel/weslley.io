import type { ComponentType, ReactNode } from 'react';

export type Gate = {
  ready: () => boolean;
  load: () => Promise<void>;
};

type Deferred<Props extends object> = {
  gate: Gate;
  View: (props: Props) => ReactNode;
};

const deferred = <Props extends object>(
  importer: () => Promise<ComponentType<Props>>
): Deferred<Props> => {
  let Component: ComponentType<Props> | null = null;
  let loading: Promise<void> | null = null;

  const load = (): Promise<void> =>
    (loading ??= importer()
      .then((loaded) => {
        Component = loaded;
      })
      .catch((error: unknown) => {
        loading = null;
        throw error;
      }));

  const View = (props: Props): ReactNode =>
    Component && <Component {...props} />;

  return { gate: { ready: () => Component !== null, load }, View };
};

export const agenda = deferred(() =>
  import(
    /* webpackChunkName: "agenda", webpackPrefetch: true */ '@site/src/components/Agenda'
  ).then((module) => module.Agenda)
);

export const badges = deferred(() =>
  import(
    /* webpackChunkName: "showcase", webpackPrefetch: true */ '@site/src/components/Badges'
  ).then((module) => module.Badges)
);

export const memories = deferred(() =>
  import(
    /* webpackChunkName: "impact", webpackPrefetch: true */ '@site/src/components/Memories'
  ).then((module) => module.Memories)
);

export const milestones = deferred(() =>
  import(
    /* webpackChunkName: "impact", webpackPrefetch: true */ '@site/src/components/Milestones'
  ).then((module) => module.Milestones)
);

export const adopters = deferred(() =>
  import(
    /* webpackChunkName: "showcase", webpackPrefetch: true */ '@site/src/components/Adopters'
  ).then((module) => module.Adopters)
);

export const star = deferred(() =>
  import(
    /* webpackChunkName: "star", webpackPrefetch: true */ '@site/src/components/Star'
  ).then((module) => module.Star)
);
