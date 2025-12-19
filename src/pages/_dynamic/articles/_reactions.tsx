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
      // Optimistic update: send to API without waiting
      if (API) {
        fetch(`${API}/views?slug=${slug}:${reaction}`).catch(() => {
          // Silently fail - the local state is already updated
        });
      }
    }

    setReactions(newReactions);
    localStorage.setItem(
      getStorageKey(slug),
      JSON.stringify(Array.from(newReactions))
    );
  };

  if (!slug) return null;

  return (
    <div className='margin-vert--md'>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <strong>Como você avalia este artigo?</strong>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {REACTIONS.map(({ id, emoji, label }) => {
            const isActive = reactions.has(id);
            return (
              <button
                key={id}
                onClick={() => handleReaction(id)}
                title={label}
                style={{
                  fontSize: '1.5rem',
                  padding: '0.5rem',
                  border: '2px solid',
                  borderColor: isActive
                    ? 'var(--ifm-color-primary)'
                    : 'transparent',
                  borderRadius: '8px',
                  background: isActive
                    ? 'var(--ifm-color-primary-lightest)'
                    : 'var(--ifm-background-surface-color)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.borderColor =
                      'var(--ifm-color-primary-light)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
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
