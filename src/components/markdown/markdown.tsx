import React from 'react';
import ReactMarkdownWithHtml from 'react-markdown/with-html';

import {
  BlockquoteRenderer,
  CloudinaryImageRenderer,
  CodeRender,
  HeadingRenderer,
  InlineCodeRenderer,
  LinkRenderer,
  ListRenderer,
  TextRenderer,
} from './renderers';

/* MonkeyPatch as currently markdown comments don't get ommitted by default.*/
const removeExcerptSeparator = (rawMarkdown?: string): string => {
  if (!rawMarkdown) {
    return '';
  }

  const excerptSeperator = '<!-- end -->';
  const cleanedMarkdown = rawMarkdown.replace(excerptSeperator, '');
  return cleanedMarkdown;
};

export const Markdown: React.FC = (props) => {
  if (props.children && typeof props.children !== 'string') {
    throw new Error(
      'Markdown component can only contain a markdown string as children',
    );
  }

  const markdown = removeExcerptSeparator(props.children?.toString());

  return (
    <ReactMarkdownWithHtml
      allowDangerousHtml
      /**
       * Custom renderers/components mapping can be defined here. If a component
       * is not mapped to a node, the node will be rendererd with the default
       * fallback. All nodes and their fallback can be viewed here:
       *
       *  - https://github.com/rexxars/react-markdown#node-types
       */
      renderers={{
        paragraph: TextRenderer,
        heading: HeadingRenderer,
        code: CodeRender,
        inlineCode: InlineCodeRenderer,
        image: CloudinaryImageRenderer,
        blockquote: BlockquoteRenderer,
        link: LinkRenderer,
        list: ListRenderer,
      }}
    >
      {markdown}
    </ReactMarkdownWithHtml>
  );
};
