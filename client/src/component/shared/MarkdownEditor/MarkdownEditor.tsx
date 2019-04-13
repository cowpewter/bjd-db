import LoadingOverlay from '@component/shared/LoadingOverlay';
import { Popover } from 'antd';
import EasyMDE from 'easymde';
import React, { Component } from 'react';
import SimpleMDEReact from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';

const style = require('./MarkdownEditor.m.less');

interface MarkdownEditorProps {
  initialValue?: string;
  save: (value: string) => void;
  saving: boolean;
}

interface MarkdownEditorState {
  value: string;
  helpVisible: boolean;
}

const baseToolbar = [
  '|',
  {
    name: 'bold',
    action: EasyMDE.toggleBold,
    className: 'fal fa-bold',
    title: 'Bold',
  },
  {
    name: 'italic',
    action: EasyMDE.toggleItalic,
    className: 'fal fa-italic',
    title: 'Italic',
  },
  {
    name: 'strike',
    action: EasyMDE.toggleStrikethrough,
    className: 'fal fa-strikethrough',
    title: 'Strikethrough',
  },
  '|',
  {
    name: 'header1',
    action: EasyMDE.toggleHeading1,
    className: 'fal fa-h1',
    title: 'Big Header',
  },
  {
    name: 'header2',
    action: EasyMDE.toggleHeading2,
    className: 'fal fa-h2',
    title: 'Medium Header',
  },
  {
    name: 'header3',
    action: EasyMDE.toggleHeading3,
    className: 'fal fa-h3',
    title: 'Small Header',
  },
  '|',
  {
    name: 'quote',
    action: EasyMDE.toggleBlockquote,
    className: 'fal fa-quote-right',
    title: 'Quote',
  },
  {
    name: 'ul',
    action: EasyMDE.toggleUnorderedList,
    className: 'fal fa-list-ul',
    title: 'List',
  },
  {
    name: 'ol',
    action: EasyMDE.toggleOrderedList,
    className: 'fal fa-list-ol',
    title: 'List',
  },
  '|',
  {
    name: 'link',
    action: EasyMDE.drawLink,
    className: 'fal fa-link',
    title: 'Insert Link',
  },
  {
    name: 'image',
    action: EasyMDE.drawImage,
    className: 'fal fa-image',
    title: 'Insert Image',
  },
  {
    name: 'table',
    action: EasyMDE.drawTable,
    className: 'fal fa-table',
    title: 'Insert Table',
  },
  '|',
  {
    name: 'undo',
    action: EasyMDE.undo,
    className: 'fal fa-undo',
    title: 'Undo',
  },
  {
    name: 'redo',
    action: EasyMDE.redo,
    className: 'fal fa-redo',
    title: 'Redo',
  },
  '|',
];

const helpPopoverContent = (
  <div className={style.help}>
    <h4>Emphasis</h4>
    <pre>**<strong>bold</strong>**</pre>
    <pre>*<em>italics</em>*</pre>
    <pre> ~~<span style={{ textDecoration: 'line-through' }}>strikethrough</span>~~</pre>
    <h4>Headers</h4>
    <pre># Big header</pre>
    <pre>## Medium header</pre>
    <pre>### Small header</pre>
    <pre>#### Tiny header</pre>
    <h4>Lists</h4>
    <pre>* Generic list item</pre>
    <pre>* Generic list item</pre>
    <pre>* Generic list item</pre>

    <pre>1. Numbered list item</pre>
    <pre>2. Numbered list item</pre>
    <pre>3. Numbered list item</pre>
    <h4>Links</h4>
    <pre>[Text to display](http://www.example.com)</pre>
    <h4>Quotes</h4>
    <pre>> This is a quote.</pre>
    <pre>> It can span multiple lines!</pre>
    <h4>Images</h4>
    <pre>![](http://www.example.com/image.jpg)</pre>
    <h4>Tables</h4>
    <pre>| Column 1 | Column 2 |</pre>
    <pre>| -------- | -------- |</pre>
    <pre>| John     | Doe      |</pre>
    <pre>| Mary     | Smith    |</pre>

    <em>Or without aligning the columns...</em>

    <pre>| Column 1 | Column 2 |</pre>
    <pre>| -------- | -------- |</pre>
    <pre>|| John | Doe |</pre>
    <pre>|| Mary | Smith |</pre>
  </div>
);

class MarkdownEditor extends Component<MarkdownEditorProps, MarkdownEditorState> {
  state = {
    value: this.props.initialValue || '',
    helpVisible: false,
  };

  private handleChange = (value: string) => {
    this.setState({ value });
  }

  public render() {
    const { helpVisible, value } = this.state;
    const { saving } = this.props;

    const toolbar = baseToolbar.slice();
    toolbar.push({
      name: 'help',
      action: () => {
        const { helpVisible } = this.state;
        this.setState({ helpVisible: !helpVisible });
      },
      className: 'fal fa-question-circle',
      title: 'Markdown Help',
    });
    toolbar.unshift({
      name: 'save',
      action: () => {
        const { save } = this.props;
        const { value } = this.state;
        save(value);
      },
      className: 'fal fa-save',
      title: 'Save',
    });

    return (
      <div className={style.root}>
        {saving && <LoadingOverlay text="Saving..." />}
        <Popover
          content={helpPopoverContent}
          visible={helpVisible}
          title="Markdown Guide"
          placement="topRight"
        >
          <SimpleMDEReact
            onChange={this.handleChange}
            value={value}
            options={{
              toolbar,
              autoDownloadFontAwesome: false,
              autofocus: true,
              spellChecker: false,
              status: false,
            }}
          />
        </Popover>
      </div>
    );
  }
}

export default MarkdownEditor;
