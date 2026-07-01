'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import type { ReactNode } from 'react';

const SIZES = {
  default: { row: '3rem', px: 'px-6' },
  compact: { row: '2.5rem', px: 'px-5' }
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
  onClick?: () => void;
  hideSlide?: boolean;
  disabled?: boolean;
};

type LinkProps = BaseProps & {
  type?: 'link';
  href: '/' | '/contact' | '/nosotros' | '/servicios' | '/blog' | `/servicios/${string}`;
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
  disabled
}: {
  label: string;
  row: string;
  px: string;
  hideSlide?: boolean;
  disabled?: boolean;
}) {
  if (hideSlide) {
    return (
      <span
        className="relative block overflow-hidden rounded-full bg-[#39B8AD] text-sm font-semibold text-white"
        style={{ height: row }}
      >
        <span
          className={`flex items-center justify-center whitespace-nowrap ${px} ${disabled ? 'opacity-70' : ''}`}
          style={{ height: row }}
        >
          {label}
        </span>
      </span>
    );
  }

  return (
    <motion.span
      className="relative block overflow-hidden rounded-full bg-[#39B8AD] text-sm font-semibold text-white"
      style={{ height: row }}
      variants={maskVariants}
      initial="rest"
      whileHover={disabled ? undefined : 'hover'}
      aria-hidden={disabled}
    >
      <motion.span className="flex flex-col" variants={slideVariants} transition={slideTransition}>
        <span
          className={`flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap ${px}`}
          style={{ height: row }}
        >
          {label}
          <span aria-hidden className="text-base leading-none">
            ↗
          </span>
        </span>
        <span
          className={`flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap ${px}`}
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
      className={`inline-block ${className}`}
    >
      <MaskUpFace label={label} row={row} px={px} hideSlide={hideSlide} disabled={disabled} />
    </Wrapper>
  );
}
