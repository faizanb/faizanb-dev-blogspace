'use client';

import { useEffect, useState } from 'react';
import {
  createHighlighter as getHighlighter,
  type BundledLanguage,
  type BundledTheme,
} from 'shiki';
import styles from './CodeBlock.module.scss';

type Props = {
  code: string;
  lang: BundledLanguage;
  isDark?: boolean;
  themeDark?: BundledTheme;
  themeLight?: BundledTheme;
};

export default function CodeBlock({
  code,
  lang,
  isDark = false,
  themeDark = 'github-dark',
  themeLight = 'github-light',
}: Props) {
  const [html, setHtml] = useState<string>('');

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
      className={styles.codeBlock}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
