'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import type { AppRoute } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const SIZES = {
  default: { row: '3rem', px: 'px-6' },
  compact: { row: '2.5rem', px: 'px-5' }
} as const;

const TONES = {
  teal: '#39B8AD',
  brand: '#BC2656'
} as const;

const maskVariants = {
  rest: {},
  hover: {}
};

const slideVariants = {
  rest: { y: 0 },
  hover: { y: '-50%' }
};

const slideTransition = { type: 'tween' as const, ease: 'easeInOut' as const, duration: 0.3 };

type BaseProps = {
  label: string;
  className?: string;
  size?: keyof typeof SIZES;
  tone?: keyof typeof TONES;
  variant?: 'solid' | 'light';
  onClick?: () => void;
  hideSlide?: boolean;
  disabled?: boolean;
};

type LinkProps = BaseProps & {
  type?: 'link';
  href: AppRoute | `/servicios/${string}` | (string & {});
};

type SubmitProps = BaseProps & {
  type: 'submit';
  href?: never;
};

export type MaskUpButtonProps = LinkProps | SubmitProps;

function MaskUpFace({
  label,
  row,
  px,
  hideSlide,
  disabled,
  tone = 'teal',
  variant = 'light'
}: {
  label: string;
  row: string;
  px: string;
  hideSlide?: boolean;
  disabled?: boolean;
  tone?: keyof typeof TONES;
  variant?: 'solid' | 'light';
}) {
  const accent = TONES[tone];
  const isLight = variant === 'light';
  const faceClass = cn(
    'relative block overflow-hidden rounded-full text-sm font-semibold mobile-btn-surface',
    isLight
      ? 'border border-[#39B8AD]/20 bg-white text-[#39B8AD] shadow-md shadow-black/[0.06]'
      : 'text-white',
    disabled && 'opacity-70'
  );
  const faceStyle = isLight ? { height: row } : { height: row, backgroundColor: accent };

  if (hideSlide) {
    return (
      <span className={faceClass} style={faceStyle}>
        <span
          className={cn('flex items-center justify-center whitespace-nowrap', px, disabled && 'opacity-70')}
          style={{ height: row }}
        >
          {label}
        </span>
      </span>
    );
  }

  return (
    <motion.span
      className={faceClass}
      style={faceStyle}
      variants={maskVariants}
      initial="rest"
      whileHover={disabled ? undefined : 'hover'}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      aria-hidden={disabled}
    >
      <motion.span className="flex flex-col" variants={slideVariants} transition={slideTransition}>
        <span
          className={cn('flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap', px)}
          style={{ height: row }}
        >
          {label}
          <span aria-hidden className="text-base leading-none">
            ↗
          </span>
        </span>
        <span
          className={cn('flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap', px)}
          style={{ height: row }}
        >
          {label}
          <span aria-hidden className="text-base leading-none">
            →
          </span>
        </span>
      </motion.span>
    </motion.span>
  );
}

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

function Wrapper({
  children,
  className,
  type,
  href,
  onClick,
  disabled,
  label
}: {
  children: ReactNode;
  className: string;
  type?: 'link' | 'submit';
  href?: LinkProps['href'];
  onClick?: () => void;
  disabled?: boolean;
  label: string;
}) {
  if (type === 'submit') {
    return (
      <button
        type="submit"
        disabled={disabled}
        onClick={onClick}
        className={className}
        aria-label={label}
      >
        {children}
      </button>
    );
  }

  if (href && isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
        aria-label={label}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href!} prefetch onClick={onClick} className={className} aria-label={label}>
      {children}
    </Link>
  );
}

export function MaskUpButton(props: MaskUpButtonProps) {
  const {
    label,
    className = '',
    size = 'default',
    tone = 'teal',
    variant = 'light',
    onClick,
    hideSlide = false,
    disabled = false
  } = props;

  const { row, px } = SIZES[size];
  const type = props.type === 'submit' ? 'submit' : 'link';
  const href = type === 'link' ? props.href : undefined;

  return (
    <Wrapper
      type={type}
      href={href}
      onClick={onClick}
      disabled={disabled}
      label={label}
      className={cn('touch-press', className.includes('w-full') ? 'block w-full' : 'inline-block', className)}
    >
      <MaskUpFace
        label={label}
        row={row}
        px={px}
        hideSlide={hideSlide}
        disabled={disabled}
        tone={tone}
        variant={variant}
      />
    </Wrapper>
  );
}
