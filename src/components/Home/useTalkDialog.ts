import type { TalkOpener } from '@site/src/components/Agenda/Card';
import { useCallback, useEffect, useState } from 'react';
import { matchPath, useHistory } from '@docusaurus/router';
import { talkDialog } from '@site/src/components/Home/stages';
import { pathOf } from '@site/src/data/previews';

type TalkDialog = {
  talk: string | null;
  current: string | null;
  open: TalkOpener;
  close: () => void;
  settle: () => void;
};

type Params = {
  slug: string;
};

const TALKS = pathOf('talks');

const TALK = `${TALKS}:slug/`;

const FROM_CARD = { origin: 'card' };

const talkOf = (pathname: string): string | null =>
  matchPath<Params>(pathname, { path: TALK, exact: true })?.params.slug ?? null;

const openedFromCard = (state: unknown): boolean =>
  typeof state === 'object' && state !== null && 'origin' in state;

export const useTalkDialog = (pathname: string): TalkDialog => {
  const history = useHistory();
  const talk = talkOf(pathname);
  const [shown, setShown] = useState<string | null>(null);
  const current = talk !== null && shown !== null ? talk : shown;

  const open = useCallback<TalkOpener>(
    (slug) => history.push(`${TALKS}${slug}/`, FROM_CARD),
    [history]
  );

  const close = useCallback(() => {
    if (openedFromCard(history.location.state)) return history.goBack();

    history.replace(TALKS);
  }, [history]);

  const settle = useCallback(() => setShown(null), []);

  useEffect(() => {
    if (talk === null) return;

    if (shown !== null) {
      if (talk !== shown && talkDialog.gate.ready()) setShown(talk);

      return;
    }

    let stale = false;

    talkDialog.gate.load().then(
      () => !stale && setShown(talk),
      () => undefined
    );

    return () => {
      stale = true;
    };
  }, [talk, shown]);

  return { talk, current, open, close, settle };
};
