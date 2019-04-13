import Marked from 'marked';
import React, { CSSProperties, SFC } from 'react';

interface MarkdownProps {
  markdown: string;
  maxWidth?: number;
  maxHeight?: number;
  className?: string;
}

const MarkdownRender: SFC<MarkdownProps> = ({ markdown, maxHeight, maxWidth, className }) => {
  const parsed = markdown ? Marked(markdown, { breaks: true }) : '';
  const style: CSSProperties = {};
  if (maxHeight) {
    style.maxHeight = `${maxHeight}px`;
    style.overflowY = 'auto';
  }
  if (maxWidth) {
    style.maxWidth = `${maxWidth}px`;
    style.overflowX = 'auto';
  }
  return (
    <div
      style={style}
      className={className}
      dangerouslySetInnerHTML={{ __html: parsed }}
    />
  );
};

export default MarkdownRender;
