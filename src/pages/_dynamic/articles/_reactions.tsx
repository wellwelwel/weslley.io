import { useEffect, useState } from 'react';

type Reaction = 'like' | 'love' | 'insightful';

interface ReactionsProps {
  slug?: string;
  API?: string;
}

const REACTIONS: Array<{ id: Reaction; emoji: string; label: string }> = [
  { id: 'like', emoji: '👍', label: 'Gostei' },
  { id: 'love', emoji: '❤️', label: 'Amei' },
  { id: 'insightful', emoji: '💡', label: 'Esclarecedor' },
];

const getStorageKey = (slug: string) => `article-reactions:${slug}`;

export const Reactions = ({ slug, API }: ReactionsProps) => {
  const [reactions, setReactions] = useState<Set<Reaction>>(new Set());

  useEffect(() => {
    if (!slug) return;

    const stored = localStorage.getItem(getStorageKey(slug));
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Reaction[];
        setReactions(new Set(parsed));
      } catch {
        // Ignore parse errors
      }
    }
  }, [slug]);

  const handleReaction = (reaction: Reaction) => {
    if (!slug) return;

    const newReactions = new Set(reactions);

    if (newReactions.has(reaction)) {
      newReactions.delete(reaction);
    } else {
      newReactions.add(reaction);

      if (API) fetch(`${API}/views?slug=${slug}:${reaction}`).catch(() => {});
    }

    setReactions(newReactions);
    localStorage.setItem(
      getStorageKey(slug),
      JSON.stringify(Array.from(newReactions))
    );
  };

  if (!slug) return null;

  return (
    <div className='article-reactions'>
      <div className='reactions-wrapper'>
        <strong>Como você avalia este artigo?</strong>
        <div className='reactions-buttons'>
          {REACTIONS.map(({ id, emoji, label }) => {
            const isActive = reactions.has(id);
            return (
              <button
                key={id}
                onClick={() => handleReaction(id)}
                title={label}
                className={isActive ? 'active' : ''}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
