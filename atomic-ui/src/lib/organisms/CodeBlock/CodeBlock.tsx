import { useEffect, useState } from 'react';
import {
  createHighlighter as getHighlighter,
  type BundledLanguage,
  type BundledTheme,
} from 'shiki';
// import styles from './CodeBlock.module.scss';

type Props = {
  code: string;
  lang: BundledLanguage;
  themeDark?: BundledTheme;
  themeLight?: BundledTheme;
};

export default function CodeBlock({
  code,
  lang,
  themeDark = 'github-dark',
  themeLight = 'github-light',
}: Props) {
  const [html, setHtml] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mq.matches);
    mq.addEventListener('change', handleThemeChange);

    return () => {
      mq.removeEventListener('change', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    async function highlightCode() {
      const highlighter = await getHighlighter({
        themes: [themeDark, themeLight],
        langs: [lang],
      });

      const htmlOutput = highlighter.codeToHtml(code, {
        lang,
        theme: isDark ? themeDark : themeLight,
      });

      setHtml(htmlOutput);
    }

    highlightCode();
  }, [code, lang, isDark, themeDark, themeLight]);

  return (
    <div
      // className={styles.codeBlock}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
