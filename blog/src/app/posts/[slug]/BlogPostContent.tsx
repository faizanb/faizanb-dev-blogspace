'use client';

import { useTheme } from 'next-themes';
import { Heading, CodeBlock } from '@atomic-ui';

function renderContentBlock(block: any, index: number, theme: string) {
  switch (block.__component) {
    case 'blocks.heading':
      return (
        <Heading key={index} text={block.text} type={block.level as any} />
      );
    case 'blocks.paragraph':
      if (block.type === 'html') {
        const html = block.text
          .map((t: any) => (t.children?.[0]?.text ? t.children[0].text : ''))
          .join('');
        return (
          <div
            key={index}
            style={{ margin: '1em 0' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
      if (block.type === 'plainText') {
        const text = block.text
          .map((t: any) => (t.children?.[0]?.text ? t.children[0].text : ''))
          .join('');
        return <p key={index}>{text}</p>;
      }
      return null;
    case 'blocks.code-snippet':
      return (
        <CodeBlock
          key={index}
          code={block.code}
          lang={block.language}
          isDark={theme === 'dark'}
        />
      );
    default:
      return null;
  }
}

export default function BlogPostContent({ content }: { content: any[] }) {
  const { theme } = useTheme();
  return (
    <>
      {content?.map((block, index) => renderContentBlock(block, index, theme!))}
    </>
  );
}
