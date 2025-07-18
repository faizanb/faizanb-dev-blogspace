'use client';

import { useTheme } from 'next-themes';
import { Heading, Paragraph, CodeBlock } from '@atomic-ui';

function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function renderContentBlock(block: any, index: number, theme: string) {
  switch (block.__component) {
    case 'blocks.heading':
      return (
        <Heading
          key={index}
          text={block.text}
          type={block.level as any}
          anchor={getAnchor(block.text)}
        />
      );
    case 'blocks.paragraph':
      let paragraphContent;
      if (block.type === 'html') {
        paragraphContent = block.text
          .map((t: any) => (t.children?.[0]?.text ? t.children[0].text : ''))
          .join('');
      }
      if (block.type === 'plainText') {
        paragraphContent = block.text
          .map((t: any) => (t.children?.[0]?.text ? t.children[0].text : ''))
          .join('');
      }
      return (
        <Paragraph key={index} content={paragraphContent} type={block.type} />
      );
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
