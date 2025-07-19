'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'next-themes';
import styles from './layout.module.scss';

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const throttle = (fn: () => void, delay: number) => {
    let lastCall = 0;

    return () => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        fn();
      }
    };
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      throttle(() => {
        setScrolled(window.scrollY > 0);
      }, 100)();
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { theme, setTheme } = useTheme();

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.blogLogoContainer}>
          <Link href="/">
            <img
              className={styles.siteLogo}
              src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/faiza_logo_portfolio.svg`}
              alt={'Faiza Dev Blogspace Logo'}
              width={50}
            />
            <span className={styles.heading}>faizanb.dev</span>
          </Link>
          <span className={styles.divider}></span>
          <span className={styles.placeholder}>Blog</span>
        </div>
        <button
          className={styles.themeToggleBtn}
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <FontAwesomeIcon
            icon={theme === 'dark' ? faMoon : faSun}
            className={styles.themeIcon}
          />
        </button>
      </header>
      {children}
    </>
  );
}
