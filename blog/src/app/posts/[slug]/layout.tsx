import React from 'react';
import Link from 'next/link';
import styles from './layout.module.scss';

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.blogLogoContainer}>
          <Link href="/" className="port-link">
            <img
              className={styles.siteLogo}
              src={'/faiza_logo_portfolio.svg'}
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
