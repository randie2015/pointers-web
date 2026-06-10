'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { NavHoverLink } from '@/components/nav-hover-link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { MaskUpButton } from '@/components/ui/mask-up-button';

export function Header() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const links = [
    { href: '/nosotros', label: t('about') },
    { href: '/#servicios', label: t('services') },
    { href: '/contact', label: t('contact') },
    { href: '/blog', label: t('blog') }
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 bg-brand text-brand-foreground shadow-md shadow-brand/20"
    >
      <div className="container-page flex h-16 md:h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Pointers"
            width={140}
            height={32}
            className="h-7 w-auto brightness-0 invert md:h-8"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {links.map((l) => (
            <NavHoverLink
              key={l.href}
              href={l.href}
              label={l.label}
              isActive={hoveredHref === l.href}
              layoutId="navbar-hover"
              onActivate={() => setHoveredHref(l.href)}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LocaleSwitcher />
          <MaskUpButton href="/contact" label={t('cta')} size="compact" />
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/15 bg-brand md:hidden">
          <nav
            className="container-page flex flex-col gap-1 py-6"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {links.map((l) => (
              <NavHoverLink
                key={l.href}
                href={l.href}
                label={l.label}
                isActive={hoveredHref === l.href}
                layoutId="navbar-hover-mobile"
                onActivate={() => setHoveredHref(l.href)}
                onClick={() => setOpen(false)}
                className="text-base"
              />
            ))}
            <div className="mt-3 flex flex-col gap-4">
              <LocaleSwitcher onSwitch={() => setOpen(false)} />
              <MaskUpButton
                href="/contact"
                label={t('cta')}
                size="compact"
                onClick={() => setOpen(false)}
              />
            </div>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
