import type { Talk } from '@site/src/components/Talks/catalog';
import type { Count } from '@site/src/components/Talks/views';
import type { Dispatch, SetStateAction } from 'react';
import { startTransition, useEffect, useState } from 'react';
import { talks } from '@site/src/components/Talks/catalog';
import { neighborsOf } from '@site/src/components/Talks/chronology';
import { countView } from '@site/src/components/Talks/views';

type TalkOptions = {
  slug: string;
  api: string | null;
};

type Loaded = {
  talk: Talk | null;
  failed: boolean;
  side: string | null;
  setSide: Dispatch<SetStateAction<string | null>>;
  views: Count;
};

type Ready = {
  slug: string;
  talk: Talk;
};

const prefetch = (src: string | null): void => {
  if (!src) return;

  new Image().src = src;
};

const warm = (slug: string | undefined): void => {
  if (!slug) return;

  talks
    .get(slug)
    ?.load()
    .then(
      (loaded) => prefetch(loaded.banner),
      () => undefined
    );
};

export const useTalk = ({ slug, api }: TalkOptions): Loaded => {
  const [ready, setReady] = useState<Ready | null>(null);
  const [failed, setFailed] = useState(false);
  const [side, setSide] = useState<string | null>(null);
  const [views, setViews] = useState<Count>('pending');
  const talk = ready?.slug === slug ? ready.talk : null;

  useEffect(() => {
    let stale = false;
    const { previous, next } = neighborsOf(slug);

    setFailed(false);
    setViews('pending');

    talks
      .get(slug)
      ?.load()
      .then(
        (loaded) => {
          if (stale) return;

          startTransition(() => {
            setSide(loaded.sides[0]?.id ?? null);
            setReady({ slug, talk: loaded });
          });
          warm(previous);
          warm(next);

          if (api)
            countView(api, loaded.counter).then(
              (count) => !stale && setViews(count)
            );
        },
        () => !stale && setFailed(true)
      );

    return () => {
      stale = true;
    };
  }, [slug, api]);

  return { talk, failed, side, setSide, views };
};
