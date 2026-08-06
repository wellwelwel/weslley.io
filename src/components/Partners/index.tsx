import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Building2, Check, Mail, Send, User, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { IoRocketSharp } from 'react-icons/io5';
import claude from '@site/src/assets/img/plush/claude.png';
import me from '@site/src/assets/img/plush/me.png';
import mvp from '@site/src/assets/img/plush/mvp.png';
import velvet from '@site/src/assets/img/plush/velvet-texture.png';
import { setLabel, useStats } from '@site/src/components/Stats';

type PartnershipType = (typeof PARTNERSHIP_TYPES)[number];

type Draft = {
  name: string;
  email: string;
  company: string;
  type: PartnershipType | '';
  message: string;
};

type Pill = {
  left: number;
  width: number;
};

export type Trigger = {
  open: boolean;
  onOpen: () => void;
};

const PARTNERSHIP_TYPES = ['Palestra', 'Workshop', 'Podcast'] as const;

const EMPTY_DRAFT: Draft = {
  name: '',
  email: '',
  company: '',
  type: '',
  message: '',
};

const BADGES = [
  { src: mvp, alt: 'Pelúcia do MVP' },
  { src: claude, alt: 'Pelúcia do Claude' },
];

const DRAFT_KEY = 'weslley:partners-draft';
const WEB3FORMS_PUBLIC_KEY = '0e430072-493e-4eba-9991-9879134fe5ef';
const SUBMIT_COOLDOWN_MS = 8000;
const FALLBACK_DOWNLOADS = '600 milhões';

const groupClass =
  'flex items-stretch overflow-hidden rounded-xl border border-ink/12 bg-paper transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:border-ink/25 focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgb(122_119_255_/_0.25)]';

const groupIconClass =
  'flex w-12 shrink-0 items-center justify-center border-r border-ink/10 bg-ink/3 text-ink/45 [&>svg]:size-4.5';

const groupInputClass =
  'w-full appearance-none border-0 bg-transparent px-3.5 py-2.5 font-sans text-base font-medium text-ink outline-none placeholder:font-normal placeholder:text-ink/35';

const fieldClass =
  'w-full appearance-none rounded-xl border border-ink/12 bg-paper px-3.5 py-2.5 font-sans text-base text-ink outline-none transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.2,0,0,1)] placeholder:text-ink/35 hover:border-ink/25 focus:border-accent focus:shadow-[0_0_0_3px_rgb(122_119_255_/_0.25)]';

const labelClass =
  'flex flex-col gap-2 text-[0.8125rem] font-semibold tracking-[-0.005em] text-ink';

const isPartnershipType = (value: unknown): value is PartnershipType =>
  PARTNERSHIP_TYPES.some((type) => type === value);

const readDraft = (): Draft => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);

    if (!raw) return EMPTY_DRAFT;

    const parsed: unknown = JSON.parse(raw);

    if (typeof parsed !== 'object' || parsed === null) return EMPTY_DRAFT;

    const value: Partial<Record<keyof Draft, unknown>> = parsed;

    return {
      name: typeof value.name === 'string' ? value.name : '',
      email: typeof value.email === 'string' ? value.email : '',
      company: typeof value.company === 'string' ? value.company : '',
      type: isPartnershipType(value.type) ? value.type : '',
      message: typeof value.message === 'string' ? value.message : '',
    };
  } catch {
    return EMPTY_DRAFT;
  }
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}): ReactNode => (
  <label className={labelClass}>
    {label}
    {children}
  </label>
);

const InlineField = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}): ReactNode => (
  <label className={groupClass}>
    <span className={groupIconClass} aria-hidden='true'>
      {icon}
    </span>
    <span className='sr-only'>{label}</span>
    {children}
  </label>
);

const TypeChips = ({
  value,
  onChange,
}: {
  value: PartnershipType | '';
  onChange: (type: PartnershipType) => void;
}): ReactNode => {
  const group = useRef<HTMLDivElement>(null);
  const chips = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState<Pill | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const chip = value ? chips.current[value] : null;

      setPill(chip ? { left: chip.offsetLeft, width: chip.offsetWidth } : null);
    };

    measure();

    if (!group.current) return;

    let frame = 0;

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });

    observer.observe(group.current);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [value]);

  return (
    <div
      ref={group}
      role='radiogroup'
      aria-label='Tipo de parceria'
      className='relative flex items-stretch gap-1 rounded-xl border border-ink/12 bg-ink/3 p-1'
    >
      {pill && (
        <span
          aria-hidden='true'
          style={{ left: pill.left, width: pill.width }}
          className='pointer-events-none absolute top-1 bottom-1 rounded-lg border border-accent/50 bg-accent/15 transition-[left,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]'
        />
      )}

      {PARTNERSHIP_TYPES.map((type) => (
        <button
          key={type}
          ref={(chip) => {
            chips.current[type] = chip;
          }}
          type='button'
          role='radio'
          aria-checked={value === type}
          onClick={() => onChange(type)}
          className={clsx(
            'relative z-1 flex-1 cursor-pointer appearance-none rounded-lg border-0 bg-transparent px-3.5 py-1.5 text-[0.8125rem] font-bold tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
            value === type ? 'text-ink' : 'text-ink/60 hover:text-ink'
          )}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

const Sent = ({ onReset }: { onReset: () => void }): ReactNode => (
  <div className='flex flex-col items-center gap-4 py-8 text-center'>
    <span className='flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent [&>svg]:size-7'>
      <Check aria-hidden='true' />
    </span>

    <div className='flex flex-col gap-1.5'>
      <h3 className='m-0 text-xl font-bold tracking-[-0.01em] text-ink'>
        Obrigado pelo contato
      </h3>
      <p className='m-0 max-w-[34ch] text-[0.9375rem]/[1.6] text-ink/70'>
        Leio cada proposta de parceria e respondo em breve.
      </p>
    </div>

    <button
      type='button'
      onClick={onReset}
      className='inline-flex cursor-pointer appearance-none items-center rounded-full border border-ink/12 bg-paper px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:border-ink/25'
    >
      Enviar outra
    </button>
  </div>
);

export const PartnersDialog = ({
  onClose,
}: {
  onClose: () => void;
}): ReactNode => {
  const panel = useRef<HTMLDivElement>(null);
  const lastSubmit = useRef(0);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [draft, setDraft] = useState<Draft>(readDraft);
  const stats = useStats();

  const downloads = stats
    ? setLabel(stats.downloadsPerYear.value, 'pt-BR', 0)
    : FALLBACK_DOWNLOADS;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    panel.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {}
  }, [draft]);

  useGSAP(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    gsap.fromTo(
      panel.current,
      { autoAlpha: 0, y: reduced ? 6 : 24, scale: reduced ? 1 : 0.98 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' }
    );
  });

  const update =
    (field: keyof Omit<Draft, 'type'>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDraft((current) => ({ ...current, [field]: event.target.value }));

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === 'sending') return;

    const honeypot = event.currentTarget.elements.namedItem('website');

    if (honeypot instanceof HTMLInputElement && honeypot.value) {
      setSent(true);
      setStatus('idle');
      setDraft((current) => ({ ...current, type: '', message: '' }));

      return;
    }

    const now = performance.now();

    if (now - lastSubmit.current < SUBMIT_COOLDOWN_MS) return;

    lastSubmit.current = now;
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_PUBLIC_KEY,
          botcheck: false,
          subject: 'Nova proposta de parceria: weslley.io',
          from_name: draft.name,
          name: draft.name,
          email: draft.email,
          company: draft.company,
          partnership_type: draft.type,
          message: draft.message,
        }),
      });

      const data: unknown = await response.json();
      const success =
        typeof data === 'object' &&
        data !== null &&
        'success' in data &&
        data.success === true;

      if (!success) throw new Error('Submission failed');

      setSent(true);
      setStatus('idle');
      setDraft((current) => ({ ...current, type: '', message: '' }));
    } catch {
      setStatus('error');
      lastSubmit.current = 0;
    }
  };

  return createPortal(
    <div
      role='presentation'
      onClick={onClose}
      className='fixed inset-0 z-100 flex items-center justify-center bg-ink/70 p-[clamp(0.75rem,2.5vw,1.75rem)] backdrop-blur-sm'
    >
      <div
        ref={panel}
        role='dialog'
        aria-modal='true'
        aria-label='Parceria com Weslley Araújo'
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className='relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-paper/50 bg-paper/90 shadow-[0_40px_120px_-30px_rgb(14_9_39_/_0.75)] outline-none backdrop-blur-2xl'
      >
        <img
          src={velvet}
          alt=''
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 size-full object-cover opacity-12'
        />

        <button
          type='button'
          onClick={onClose}
          aria-label='Fechar'
          className='absolute top-3 right-3 z-2 inline-flex size-9 cursor-pointer appearance-none items-center justify-center rounded-full border border-white/30 bg-blush text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.35),0_4px_5px_-4px_rgb(253_121_168_/_0.85)] transition-[background-color,box-shadow,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-blush-deep hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.35),0_5px_10px_-4px_rgb(232_67_147_/_0.95)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-deep active:scale-95 [&>svg]:size-4.5'
        >
          <X aria-hidden='true' />
        </button>

        <div className='relative flex min-h-0 flex-1 flex-col overflow-y-auto'>
          {sent ? (
            <div className='p-[clamp(1.25rem,3vw,2rem)]'>
              <Sent onReset={() => setSent(false)} />
            </div>
          ) : (
            <div className='grid flex-1 gap-7 p-[clamp(1.5rem,4vw,3.5rem)] md:grid-cols-[minmax(0,1fr)_auto]'>
              <form
                onSubmit={onSubmit}
                className='flex w-full max-w-120 flex-col gap-4 self-start rounded-[1.125rem] border border-ink/10 bg-paper/70 px-[clamp(1.125rem,2.5vw,1.625rem)] py-[clamp(1.125rem,2.5vw,1.5rem)] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.7),0_8px_32px_-12px_rgb(14_9_39_/_0.25)]'
              >
                <div className='flex flex-col gap-2'>
                  <h2 className='m-0 text-[clamp(1.375rem,3vw,1.625rem)]/[1.2] font-bold tracking-[-0.02em] text-ink text-balance'>
                    Bora trabalhar juntos 🤘🏻
                  </h2>

                  <p className='m-0 text-sm/relaxed text-ink/70 text-pretty'>
                    Apoie o open source em todos os meus projetos. Parceiros
                    ganham um logo exclusivo nos repositórios e landing pages,
                    além de um espaço na página de parceiros.
                  </p>
                </div>

                <input
                  type='text'
                  name='website'
                  tabIndex={-1}
                  autoComplete='off'
                  aria-hidden='true'
                  className='absolute -left-[9999px] size-px overflow-hidden'
                />

                <InlineField label='Nome' icon={<User />}>
                  <input
                    className={groupInputClass}
                    type='text'
                    name='name'
                    autoComplete='name'
                    placeholder='João da Silva'
                    value={draft.name}
                    onChange={update('name')}
                    required
                  />
                </InlineField>

                <InlineField label='E-mail' icon={<Mail />}>
                  <input
                    className={groupInputClass}
                    type='email'
                    name='email'
                    autoComplete='email'
                    placeholder='joao@empresa.com'
                    value={draft.email}
                    onChange={update('email')}
                    required
                  />
                </InlineField>

                <InlineField label='Empresa' icon={<Building2 />}>
                  <input
                    className={groupInputClass}
                    type='text'
                    name='company'
                    autoComplete='organization'
                    placeholder='Acme, Inc.'
                    value={draft.company}
                    onChange={update('company')}
                    required
                  />
                </InlineField>

                <Field label='Tipo de parceria'>
                  <TypeChips
                    value={draft.type}
                    onChange={(type) =>
                      setDraft((current) => ({ ...current, type }))
                    }
                  />
                </Field>

                <Field label='O que você tem em mente?'>
                  <textarea
                    className={`${fieldClass} min-h-28 resize-y`}
                    name='message'
                    rows={4}
                    placeholder='Conte o que vamos construir ✨'
                    value={draft.message}
                    onChange={update('message')}
                    required
                  />
                </Field>

                <label className='flex cursor-pointer items-start gap-2.5 text-[0.8125rem]/[1.5] text-ink/70 transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)] select-none hover:text-ink'>
                  <span className='relative mt-px block size-4.5 shrink-0'>
                    <input
                      className='peer absolute inset-0 z-1 m-0 size-full cursor-pointer appearance-none rounded-md border border-ink/20 bg-paper transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)] after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2 checked:border-accent checked:bg-accent hover:border-ink/35'
                      type='checkbox'
                      name='consent'
                      required
                    />
                    <span className='pointer-events-none absolute inset-0 z-2 flex items-center justify-center text-white opacity-0 transition-opacity duration-200 ease-[cubic-bezier(0.2,0,0,1)] peer-checked:opacity-100 [&>svg]:size-3'>
                      <Check aria-hidden='true' />
                    </span>
                  </span>
                  Concordo em ser contatado sobre esta proposta de parceria.
                </label>

                {status === 'error' && (
                  <p role='alert' className='m-0 text-[0.8125rem] text-red-600'>
                    Algo deu errado. Tente novamente.
                  </p>
                )}

                <button
                  type='submit'
                  disabled={status === 'sending'}
                  className='group mt-1 inline-flex cursor-pointer appearance-none items-center justify-center gap-2.5 rounded-xl border-0 bg-accent px-5 py-3.5 text-sm font-bold tracking-[-0.01em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.25),0_6px_16px_-6px_rgb(122_119_255_/_0.9)] transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70'
                >
                  <span className='relative grid size-4.5 shrink-0 place-items-center overflow-hidden'>
                    <Send
                      className='col-start-1 row-start-1 size-4.5 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-[120%] group-hover:translate-y-[-120%]'
                      aria-hidden='true'
                    />
                    <Send
                      className='col-start-1 row-start-1 size-4.5 translate-x-[-120%] translate-y-[120%] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-0 group-hover:translate-y-0'
                      aria-hidden='true'
                    />
                  </span>
                  {status === 'sending'
                    ? 'Enviando…'
                    : 'Vamos construir juntos'}
                </button>
              </form>

              <aside className='flex flex-col items-center justify-center gap-4 rounded-[1.125rem] border border-ink/10 bg-paper/70 px-[clamp(1.125rem,2.5vw,1.75rem)] py-[clamp(1.25rem,2.5vw,1.5rem)] text-center md:-mt-[clamp(1.5rem,4vw,3.5rem)] md:-mr-[clamp(1.5rem,4vw,3.5rem)] md:-mb-[clamp(1.5rem,4vw,3.5rem)] md:max-w-75 md:rounded-none md:border-0 md:border-l md:border-ink/10 md:py-[clamp(1.5rem,4vw,3.5rem)]'>
                <img
                  src={me}
                  alt='Pelúcia do Weslley Araújo'
                  decoding='async'
                  draggable={false}
                  className='pointer-events-none w-32 shrink-0 object-contain drop-shadow-[0_2px_2px_rgb(14_9_39_/_0.35)] md:w-55'
                />

                <p className='m-0 text-[0.8125rem]/[1.6] font-medium text-ink/80 text-pretty'>
                  Com mais de{' '}
                  <span className='font-semibold text-ink tabular-nums'>
                    {downloads}
                  </span>{' '}
                  de downloads anuais em projetos autorais, Weslley impacta
                  milhões de desenvolvedores globalmente através do open source.
                  Reconhecido como <strong>Microsoft MVP</strong> e{' '}
                  <strong>Anthropic CVP</strong>, ele constrói para quem
                  constrói.
                </p>

                <div className='flex items-end justify-center gap-2'>
                  {BADGES.map(({ src, alt }) => (
                    <img
                      key={alt}
                      src={src}
                      alt={alt}
                      decoding='async'
                      draggable={false}
                      className='pointer-events-none size-11 shrink-0 object-contain drop-shadow-[0_1px_1px_rgb(14_9_39_/_0.3)]'
                    />
                  ))}
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export const Partners = ({ open, onOpen }: Trigger): ReactNode => (
  <button
    type='button'
    onClick={onOpen}
    aria-haspopup='dialog'
    aria-expanded={open}
    className='group inline-flex h-11 cursor-pointer appearance-none items-center gap-3.5 rounded-full border-0 bg-ink pr-1.5 pl-6 font-sans text-[0.9375rem] font-semibold text-paper shadow-[0_1px_2px_rgb(14_9_39_/_0.16),0_5px_5px_-6px_rgb(14_9_39_/_0.4)] transition-[background-color,box-shadow,scale] duration-750 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-ink/90 hover:shadow-[0_1px_2px_rgb(14_9_39_/_0.18),0_10px_10px_-8px_rgb(14_9_39_/_0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-98'
  >
    Bora trabalhar juntos
    <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-paper'>
      <span className='relative grid size-4 place-items-center overflow-hidden'>
        <IoRocketSharp
          className='col-start-1 row-start-1 size-4 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-[120%] group-hover:translate-y-[-120%]'
          aria-hidden='true'
        />
        <IoRocketSharp
          className='col-start-1 row-start-1 size-4 translate-x-[-120%] translate-y-[120%] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-0 group-hover:translate-y-0'
          aria-hidden='true'
        />
      </span>
    </span>
  </button>
);
