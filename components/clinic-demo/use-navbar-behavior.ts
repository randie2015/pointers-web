'use client';

import { useEffect, useState } from 'react';

export type NavSectionTheme = 'light' | 'rose' | 'dark';

type NavbarBehavior = {
  visible: boolean;
  scrolled: boolean;
  sectionTheme: NavSectionTheme;
};

const NAV_OFFSET = 72;

function resolveSectionTheme(): NavSectionTheme {
  if (typeof window === 'undefined') return 'light';

  const probeY = window.scrollY + NAV_OFFSET;
  const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme]');

  if (sections.length === 0) return 'light';

  let active: NavSectionTheme = 'light';

  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top + window.scrollY;
    const theme = section.dataset.navTheme as NavSectionTheme | undefined;

    if (theme && probeY >= top) {
      active = theme;
    }
  });

  return active;
}

export function useNavbarBehavior(pathname: string): NavbarBehavior {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [sectionTheme, setSectionTheme] = useState<NavSectionTheme>('light');

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      setSectionTheme(resolveSectionTheme());

      if (y <= 48) {
        setVisible(true);
      } else if (y > lastY + 6) {
        setVisible(false);
      } else if (y < lastY - 6) {
        setVisible(true);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    const onResize = () => setSectionTheme(resolveSectionTheme());

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [pathname]);

  return { visible, scrolled, sectionTheme };
}
