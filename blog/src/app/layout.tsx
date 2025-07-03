'use client';
import { ThemeProvider } from 'next-themes';
import { Nunito_Sans } from 'next/font/google';
import styles from './layout.module.scss';

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
