import type { Slot } from '@site/src/components/Agenda/slots';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { useState } from 'react';
import clsx from 'clsx';
import {
  Check,
  Copy,
  ExternalLink,
  GraduationCap,
  Info,
  Star,
  TicketPercent,
} from 'lucide-react';
import { BiLinkExternal } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';
import { RiVideoOnAiLine } from 'react-icons/ri';
import { TbMicrophone2 } from 'react-icons/tb';
import { AVATAR } from '@site/src/components/Agenda/slots';
import { Picture } from '@site/src/components/Picture';
import { useCopy } from '@site/src/hooks/useCopy';

type SwapOptions = {
  copied: boolean;
  className?: string;
};

export type TalkOpener = (slug: string) => void;

export type CardOptions = {
  slot: Slot;
  place: number;
  /** Parks the card left of the focus. */
  passed: boolean;
  /** Backdrop blur, reserved for the cards a viewer can see. */
  frosted: boolean;
  /** Renders the body. An undressed card keeps only its shell. */
  dressed: boolean;
  onFocus: () => void;
  onTalk: TalkOpener;
};

const COUPON =
  'flex min-w-0 items-center gap-1 text-[0.625rem]/none font-bold tracking-wide text-ink/70 uppercase';

const REDEEM = `${COUPON} relative transition-[color,scale] duration-250 ease-swift after:absolute after:-inset-x-1 after:-inset-y-3.5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95`;

const SWAP =
  'absolute inset-0 size-3 transition-[opacity,scale,filter] duration-250 ease-swift';

/** Eases the body out when the card shrinks to a sliver. */
const BODY = 'transition-opacity duration-500 ease-swift';

const FLIGHT =
  'col-start-1 row-start-1 transition-transform duration-300 ease-swift';

const ACTION =
  'relative flex size-7.5 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--tone)_15%,transparent)] text-[var(--tone)] transition-[background-color,color,opacity,scale] duration-250 ease-swift after:absolute after:-inset-1.25 hover:bg-[var(--tone)] hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95';

const CLEARANCE: Record<number, string> = { 1: 'pr-10.5', 2: 'pr-20.5' };

const LAUNCH = {
  leave: `${FLIGHT} size-4 group-hover/launch:translate-x-[120%] group-hover/launch:translate-y-[-120%]`,
  enter: `${FLIGHT} size-4 translate-x-[-120%] translate-y-[120%] group-hover/launch:translate-x-0 group-hover/launch:translate-y-0`,
};

const ROLES: Record<string, IconType | LucideIcon> = {
  Keynote: Star,
  Mentoria: GraduationCap,
  Palestra: TbMicrophone2,
  Embaixador: FaRegHeart,
  'Palestra (Live)': RiVideoOnAiLine,
};

const discount = ({ code, off }: NonNullable<Slot['coupon']>): string =>
  off ? `${off}% OFF` : code.replace(/^\D*([1-9]\d?)$/, '$1% OFF');

const arrange = (place: number, passed: boolean): string => {
  if (passed)
    return 'z-0 -translate-x-14 scale-90 opacity-0 invisible pointer-events-none';

  if (place === 0) return 'z-20';

  if (place === 1)
    return 'z-10 translate-x-(--spread) scale-90 opacity-55 hover:opacity-75 cursor-pointer max-sm:peek squat:opacity-70 lg:max-xl:*:opacity-0 short-wide:*:opacity-0';

  return 'z-0 translate-x-[calc(var(--spread)+6rem)] scale-75 opacity-0 invisible pointer-events-none';
};

const Swap = ({ copied, className }: SwapOptions): ReactNode => (
  <span
    className={clsx(
      'relative size-3 shrink-0 transition-opacity duration-250 ease-swift',
      className
    )}
    aria-hidden='true'
  >
    <Copy className={clsx(SWAP, copied && 'scale-25 opacity-0 blur-xs')} />
    <Check className={clsx(SWAP, !copied && 'scale-25 opacity-0 blur-xs')} />
  </span>
);

export const Card = ({
  slot,
  place,
  passed,
  frosted,
  dressed,
  onFocus,
  onTalk,
}: CardOptions): ReactNode => {
  const [copiedCoupon, copyCoupon] = useCopy();
  const [copiedAddress, copyAddress] = useCopy();
  const [origin] = useState(place);
  const { address, coupon, talk } = slot;
  const center = place === 0;
  const clickable = place === 1;
  const free = coupon?.code.toLowerCase() === 'gratuito';
  const details = slot.material ?? slot.url;
  const actions = Number(Boolean(talk)) + Number(Boolean(details));
  const Role = ROLES[slot.role] ?? TbMicrophone2;

  return (
    <article
      aria-hidden={!center}
      onClick={clickable ? onFocus : undefined}
      className={clsx(
        'group/card relative col-start-1 row-start-1 flex w-full max-w-72 flex-col gap-3 rounded-3xl bg-ink/6 p-5 shadow-[inset_0_1px_0_rgb(240_244_255_/_0.12),inset_0_0_0_1px_rgb(240_244_255_/_0.06),0_16px_32px_-16px_rgb(0_0_0_/_0.55)] transition-[translate,scale,opacity,visibility] duration-500 ease-swift select-none max-sm:rounded-[1.25rem] max-sm:p-3.5 short:gap-1.5 short:rounded-[1.25rem] short:p-3 cramped:gap-1 cramped:p-2.5',
        frosted && 'backdrop-blur-xl',
        origin < 2 && 'animate-fade [animation-delay:500ms]',
        arrange(place, passed)
      )}
    >
      {!dressed ? null : (
        <>
          <div className={`${BODY} flex items-center gap-2.5`}>
            <Picture
              src={slot.logo ?? AVATAR}
              alt=''
              sizes='2.25rem'
              decoding='async'
              draggable={false}
              className='size-9 shrink-0 object-contain max-sm:size-8 short:size-8'
            />

            <div className='flex min-w-0 flex-col gap-0.5'>
              <p className='m-0 truncate text-sm/tight font-semibold text-ink'>
                {slot.event}
              </p>
              {slot.venue && (
                <p className='m-0 flex items-center gap-1.75 text-[0.6875rem]/normal font-medium text-ink/55'>
                  <span className='truncate'>{slot.venue}</span>

                  {address && (
                    <button
                      type='button'
                      onClick={() => copyAddress(address)}
                      tabIndex={center ? undefined : -1}
                      aria-label={
                        copiedAddress ? 'Endereço copiado' : 'Copiar endereço'
                      }
                      className={clsx(
                        'relative flex cursor-pointer appearance-none border-0 bg-transparent p-0 text-inherit transition-[color,opacity,scale] duration-250 ease-swift after:absolute after:-inset-3.5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95',
                        !center && 'pointer-events-none opacity-0'
                      )}
                    >
                      <Swap copied={copiedAddress} />
                    </button>
                  )}
                </p>
              )}
            </div>
          </div>

          <p
            className={`${BODY} m-0 text-[0.8125rem]/normal font-medium text-pretty text-ink/85`}
          >
            {slot.title}
          </p>

          <footer
            className={clsx(
              BODY,
              'mt-auto flex items-center justify-between gap-3',
              CLEARANCE[actions]
            )}
          >
            <div className='flex min-w-0 flex-col items-start gap-1.5'>
              <span className='flex items-center gap-1 text-[0.625rem]/none font-bold tracking-widest text-ink/70 uppercase'>
                <Role className='size-3 shrink-0' aria-hidden='true' />
                {slot.role}
              </span>

              {coupon &&
                (coupon.url ? (
                  <a
                    href={coupon.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    tabIndex={center ? undefined : -1}
                    aria-label={`Cupom ${discount(coupon)}`}
                    className={clsx(REDEEM, !center && 'pointer-events-none')}
                  >
                    <TicketPercent
                      className='size-3 shrink-0'
                      aria-hidden='true'
                    />
                    <span className='truncate'>{discount(coupon)}</span>
                    <ExternalLink
                      className={clsx(
                        'size-3 shrink-0 origin-bottom text-[#ff5498] transition-opacity duration-250 ease-swift group-hover/card:animate-hop',
                        !center && 'opacity-0'
                      )}
                      aria-hidden='true'
                    />
                  </a>
                ) : free ? (
                  <span className={COUPON}>
                    <TicketPercent
                      className='size-3 shrink-0'
                      aria-hidden='true'
                    />
                    <span className='truncate'>{coupon.code}</span>
                  </span>
                ) : (
                  <button
                    type='button'
                    onClick={() => copyCoupon(coupon.code)}
                    tabIndex={center ? undefined : -1}
                    aria-label={
                      copiedCoupon
                        ? 'Cupom copiado'
                        : `Copiar cupom ${coupon.code}`
                    }
                    className={clsx(
                      REDEEM,
                      'cursor-pointer appearance-none border-0 bg-transparent p-0',
                      !center && 'pointer-events-none'
                    )}
                  >
                    <TicketPercent
                      className='size-3 shrink-0'
                      aria-hidden='true'
                    />
                    <span className='truncate'>{coupon.code}</span>
                    <Swap
                      copied={copiedCoupon}
                      className={clsx(
                        'text-[var(--tone)]',
                        !center && 'opacity-0'
                      )}
                    />
                  </button>
                ))}
            </div>

            {actions > 0 && (
              <div className='absolute right-5 bottom-5 flex items-center gap-2.5 max-sm:right-3.5 max-sm:bottom-3.5 short:right-3 short:bottom-3'>
                {talk && (
                  <button
                    type='button'
                    onClick={() => onTalk(talk)}
                    tabIndex={center ? undefined : -1}
                    aria-haspopup='dialog'
                    aria-label='Sobre a palestra'
                    className={clsx(
                      ACTION,
                      'cursor-pointer appearance-none border-0 p-0',
                      !center && 'pointer-events-none opacity-0'
                    )}
                  >
                    <Info className='size-4' aria-hidden='true' />
                  </button>
                )}

                {details && (
                  <a
                    href={details}
                    target='_blank'
                    rel='noopener noreferrer'
                    tabIndex={center ? undefined : -1}
                    aria-label={
                      slot.time
                        ? `Detalhes da palestra às ${slot.time}`
                        : 'Detalhes da palestra'
                    }
                    className={clsx(
                      'group/launch',
                      ACTION,
                      !center && 'pointer-events-none opacity-0'
                    )}
                  >
                    <span
                      className='relative grid size-4 place-items-center overflow-hidden'
                      aria-hidden='true'
                    >
                      <BiLinkExternal className={LAUNCH.leave} />
                      <BiLinkExternal className={LAUNCH.enter} />
                    </span>
                  </a>
                )}
              </div>
            )}
          </footer>
        </>
      )}
    </article>
  );
};
