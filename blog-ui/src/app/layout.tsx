'use client';
import { ThemeProvider } from 'next-themes';
import { Nunito_Sans } from 'next/font/google';
import styles from './layout.module.scss';
import '~styles/globals.scss';

const layout_font = Nunito_Sans({
  weight: ['200', '300', '400', '500', '700'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/favicon.ico`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/favicon-192x192.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/favicon-512x512.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/apple-touch-icon.png`}
        />
      </head>
      <body className={`${layout_font.className} ${styles.body}`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
