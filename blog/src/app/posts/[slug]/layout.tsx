'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.blogLogoContainer}>
          <Link href="/" className="port-link">
            <img
              className={styles.siteLogo}
              src={`/faiza_logo_portfolio${scrolled ? '_light' : ''}.svg`}
              alt={'Faiza Dev Blogspace Logo'}
              width={50}
            />
            <span className={styles.heading}>faizanb.dev</span>
          </Link>
        </div>
        <span>{` | `}</span>
        <span className={styles.placeholder}>Blog</span>
      </header>
      {children}
    </>
  );
}
