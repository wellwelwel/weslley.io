import type { Draft } from '@site/src/components/Partners/draft';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { useRef, useState } from 'react';
import { Building2, Check, Mail, Send, User } from 'lucide-react';
import { Dialog } from '@site/src/components/Dialog';
import { readDraft, saveDraft } from '@site/src/components/Partners/draft';
import { submit } from '@site/src/components/Partners/submit';
import { TypeChips } from '@site/src/components/Partners/TypeChips';
import { Picture } from '@site/src/components/Picture';
import { images } from '@site/src/data/previews';
import { useDownloadsLabel } from '@site/src/hooks/useDownloads';
import { useDraft } from '@site/src/hooks/useDraft';

type PartnersDialogOptions = {
  open: boolean;
  onClose: () => void;
  onClosed: () => void;
};

type SentOptions = {
  onReset: () => void;
};

type FieldOptions = {
  label: string;
  children: ReactNode;
};

type InlineFieldOptions = FieldOptions & {
  icon: ReactNode;
};

type Status = 'idle' | 'sending' | 'error';

const { claude, me, mvp } = images;

const BADGES = [
  { src: mvp, alt: 'Pelúcia do MVP' },
  { src: claude, alt: 'Pelúcia do Claude' },
];

const SUBMIT_COOLDOWN_MS = 8000;

const STORE = { read: readDraft, save: saveDraft };

const GROUP =
  'flex items-stretch overflow-hidden rounded-xl border border-ink/12 bg-paper transition-[border-color,box-shadow] duration-200 ease-swift hover:border-ink/25 focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgb(122_119_255_/_0.25)]';

const GROUP_ICON =
  'flex w-12 shrink-0 items-center justify-center border-r border-ink/10 bg-ink/3 text-ink/45 [&>svg]:size-4.5';

const GROUP_INPUT =
  'w-full appearance-none border-0 bg-transparent px-3.5 py-2.5 font-sans text-base font-medium text-ink outline-none placeholder:font-normal placeholder:text-ink/35';

const FIELD =
  'w-full appearance-none rounded-xl border border-ink/12 bg-paper px-3.5 py-2.5 font-sans text-base text-ink outline-none transition-[border-color,box-shadow] duration-200 ease-swift placeholder:text-ink/35 hover:border-ink/25 focus:border-accent focus:shadow-[0_0_0_3px_rgb(122_119_255_/_0.25)]';

const LABEL =
  'flex flex-col gap-2 text-[0.8125rem] font-semibold tracking-[-0.005em] text-ink';

const Field = ({ label, children }: FieldOptions): ReactNode => (
  <label className={LABEL}>
    {label}
    {children}
  </label>
);

const InlineField = ({
  label,
  icon,
  children,
}: InlineFieldOptions): ReactNode => (
  <label className={GROUP}>
    <span className={GROUP_ICON} aria-hidden='true'>
      {icon}
    </span>
    <span className='sr-only'>{label}</span>
    {children}
  </label>
);

const Sent = ({ onReset }: SentOptions): ReactNode => (
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
      className='inline-flex cursor-pointer appearance-none items-center rounded-full border border-ink/12 bg-paper px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 ease-swift hover:border-ink/25'
    >
      Enviar outra
    </button>
  </div>
);

export const PartnersDialog = ({
  open,
  onClose,
  onClosed,
}: PartnersDialogOptions): ReactNode => {
  const lastSubmit = useRef(0);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [draft, setDraft] = useDraft<Draft>(STORE);
  const downloads = useDownloadsLabel();

  const update =
    (field: keyof Omit<Draft, 'type'>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDraft((current) => ({ ...current, [field]: event.target.value }));

  const finish = () => {
    setSent(true);
    setStatus('idle');
    setDraft((current) => ({ ...current, type: '', message: '' }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === 'sending') return;

    const honeypot = event.currentTarget.elements.namedItem('website');

    if (honeypot instanceof HTMLInputElement && honeypot.value) return finish();

    const now = performance.now();

    if (now - lastSubmit.current < SUBMIT_COOLDOWN_MS) return;

    lastSubmit.current = now;
    setStatus('sending');

    if (await submit(draft)) return finish();

    setStatus('error');
    lastSubmit.current = 0;
  };

  return (
    <Dialog
      open={open}
      label='Parceria com Weslley Araújo'
      onClose={onClose}
      onClosed={onClosed}
    >
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
                Apoie o open source em todos os meus projetos. Parceiros ganham
                um logo exclusivo nos repositórios e landing pages, além de um
                espaço na página de parceiros.
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
                className={GROUP_INPUT}
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
                className={GROUP_INPUT}
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
                className={GROUP_INPUT}
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
                className={`${FIELD} min-h-28 resize-y`}
                name='message'
                rows={4}
                placeholder='Conte o que vamos construir ✨'
                value={draft.message}
                onChange={update('message')}
                required
              />
            </Field>

            <label className='flex cursor-pointer items-start gap-2.5 text-[0.8125rem]/[1.5] text-ink/70 transition-colors duration-200 ease-swift select-none hover:text-ink'>
              <span className='relative mt-px block size-4.5 shrink-0'>
                <input
                  className='peer absolute inset-0 z-1 m-0 size-full cursor-pointer appearance-none rounded-md border border-ink/20 bg-paper transition-[border-color,background-color] duration-200 ease-swift after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2 checked:border-accent checked:bg-accent hover:border-ink/35'
                  type='checkbox'
                  name='consent'
                  required
                />
                <span className='pointer-events-none absolute inset-0 z-2 flex items-center justify-center text-white opacity-0 transition-opacity duration-200 ease-swift peer-checked:opacity-100 [&>svg]:size-3'>
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
              className='group mt-1 inline-flex cursor-pointer appearance-none items-center justify-center gap-2.5 rounded-xl border-0 bg-accent px-5 py-3.5 text-sm font-bold tracking-[-0.01em] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.25),0_6px_16px_-6px_rgb(122_119_255_/_0.9)] transition-[background-color,box-shadow] duration-300 ease-swift hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70'
            >
              <span className='relative grid size-4.5 shrink-0 place-items-center overflow-hidden'>
                <Send
                  className='col-start-1 row-start-1 size-4.5 transition-transform duration-300 ease-swift group-hover:translate-x-[120%] group-hover:translate-y-[-120%]'
                  aria-hidden='true'
                />
                <Send
                  className='col-start-1 row-start-1 size-4.5 translate-x-[-120%] translate-y-[120%] transition-transform duration-300 ease-swift group-hover:translate-x-0 group-hover:translate-y-0'
                  aria-hidden='true'
                />
              </span>
              {status === 'sending' ? 'Enviando…' : 'Vamos construir juntos'}
            </button>
          </form>

          <aside className='flex flex-col items-center justify-center gap-4 rounded-[1.125rem] border border-ink/10 bg-paper/70 px-[clamp(1.125rem,2.5vw,1.75rem)] py-[clamp(1.25rem,2.5vw,1.5rem)] text-center md:-mt-[clamp(1.5rem,4vw,3.5rem)] md:-mr-[clamp(1.5rem,4vw,3.5rem)] md:-mb-[clamp(1.5rem,4vw,3.5rem)] md:max-w-75 md:rounded-none md:border-0 md:border-l md:border-ink/10 md:py-[clamp(1.5rem,4vw,3.5rem)]'>
            <Picture
              src={me}
              alt='Pelúcia do Weslley Araújo'
              sizes='(min-width: 48rem) 13.75rem, 8rem'
              decoding='async'
              draggable={false}
              className='pointer-events-none aspect-square w-32 shrink-0 object-contain drop-shadow-[0_2px_2px_rgb(14_9_39_/_0.35)] md:w-55'
            />

            <p className='m-0 text-[0.8125rem]/[1.6] font-medium text-ink/80 text-pretty'>
              Com mais de{' '}
              <span className='font-semibold text-ink tabular-nums'>
                {downloads}
              </span>{' '}
              de downloads anuais em projetos autorais, Weslley impacta milhões
              de desenvolvedores globalmente através do open source. Reconhecido
              como <strong>Microsoft MVP</strong> e{' '}
              <strong>Anthropic CVP</strong>, ele constrói para quem constrói.
            </p>

            <div className='flex items-end justify-center gap-2'>
              {BADGES.map(({ src, alt }) => (
                <Picture
                  key={alt}
                  src={src}
                  alt={alt}
                  sizes='2.75rem'
                  decoding='async'
                  draggable={false}
                  className='pointer-events-none size-11 shrink-0 object-contain drop-shadow-[0_1px_1px_rgb(14_9_39_/_0.3)]'
                />
              ))}
            </div>
          </aside>
        </div>
      )}
    </Dialog>
  );
};
