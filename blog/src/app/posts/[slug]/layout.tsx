import React from 'react';
import Link from 'next/link';
import { Nunito_Sans } from 'next/font/google';
import styles from './layout.module.scss';

const layout_font = Nunito_Sans({
  weight: ['200', '300', '400', '500', '700'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
});

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={`${layout_font.className} ${styles.body}`}>
      <header className={styles.header}>
        <Link href="/" className="port-link">
          <img
            className={styles.siteLogo}
            src={'/faiza_logo_portfolio.svg'}
            alt={'Faiza Dev Blogspace Logo'}
            width={50}
          />
        </Link>
        <span className={styles.heading}>Faiza Dev Blogspace</span>
        <span className={styles.placeholder} />
      </header>
      {children}
    </body>
  );
}
