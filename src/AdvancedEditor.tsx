import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { SelectionAlwaysOnDisplay } from '@lexical/react/LexicalSelectionAlwaysOnDisplay';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { CAN_USE_DOM } from '@lexical/utils';

// Core Lexical nodes
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { HashtagNode } from '@lexical/hashtag';
import { MarkNode } from '@lexical/mark';
import { OverflowNode } from '@lexical/overflow';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';

// Additional plugins
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';

// Note: For a full implementation, you would need to create these custom nodes and plugins
// For now, we'll use a simplified version with core Lexical features

import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';

import SimpleToolbar from './SimpleToolbar';
import './AdvancedEditor.css';
import './SimpleToolbar.css';

// Core Lexical nodes (simplified version)
const PlaygroundNodes = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  HashtagNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  OverflowNode,
  HorizontalRuleNode,
  MarkNode,
];

// Advanced theme
const theme = {
  heading: {
    h1: 'editor-h1',
    h2: 'editor-h2',
    h3: 'editor-h3',
    h4: 'editor-h4',
    h5: 'editor-h5',
    h6: 'editor-h6',
  },
  quote: 'editor-quote',
  list: {
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
    listitem: 'editor-listitem',
  },
  code: 'editor-code',
  codeHighlight: {
    atrule: 'editor-tokenAttr',
    attr: 'editor-tokenAttr',
    boolean: 'editor-tokenBoolean',
    builtin: 'editor-tokenBuiltin',
    cdata: 'editor-tokenCdata',
    char: 'editor-tokenChar',
    class: 'editor-tokenClass',
    'class-name': 'editor-tokenClassName',
    comment: 'editor-tokenComment',
    constant: 'editor-tokenConstant',
    deleted: 'editor-tokenDeleted',
    doctype: 'editor-tokenDoctype',
    entity: 'editor-tokenEntity',
    function: 'editor-tokenFunction',
    important: 'editor-tokenImportant',
    inserted: 'editor-tokenInserted',
    keyword: 'editor-tokenKeyword',
    namespace: 'editor-tokenNamespace',
    number: 'editor-tokenNumber',
    operator: 'editor-tokenOperator',
    prolog: 'editor-tokenProlog',
    property: 'editor-tokenProperty',
    punctuation: 'editor-tokenPunctuation',
    regex: 'editor-tokenRegex',
    selector: 'editor-tokenSelector',
    string: 'editor-tokenString',
    symbol: 'editor-tokenSymbol',
    tag: 'editor-tokenTag',
    url: 'editor-tokenUrl',
    variable: 'editor-tokenVariable',
  },
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    strikethrough: 'editor-text-strikethrough',
    underline: 'editor-text-underline',
    code: 'editor-text-code',
  },
  link: 'editor-link',
  table: 'editor-table',
  tableCell: 'editor-tableCell',
  tableCellHeader: 'editor-tableCellHeader',
};

// Initial content
function $prepopulatedRichText() {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    const heading = $createHeadingNode('h1');
    heading.append($createTextNode('Welcome to the Advanced Lexical Editor!'));
    root.append(heading);
    
    const paragraph = $createParagraphNode();
    paragraph.append(
      $createTextNode('This editor includes all the features from the Lexical playground: '),
      $createTextNode('rich text formatting').toggleFormat('bold'),
      $createTextNode(', '),
      $createTextNode('code highlighting').toggleFormat('code'),
      $createTextNode(', '),
      $createTextNode('tables').toggleFormat('italic'),
      $createTextNode(', '),
      $createTextNode('collaborative editing').toggleFormat('underline'),
      $createTextNode(', and much more!')
    );
    root.append(paragraph);
    
    const quote = $createQuoteNode();
    quote.append($createTextNode('Try out all the features in the toolbar above!'));
    root.append(quote);
  }
}

// Error handler
function onError(error: Error) {
  console.error(error);
}

interface AdvancedEditorProps {
  isRichText?: boolean;
  isCollab?: boolean;
  isCodeHighlighted?: boolean;
  isCodeShiki?: boolean;
  isAutocomplete?: boolean;
  isMaxLength?: boolean;
  isCharLimit?: boolean;
  hasLinkAttributes?: boolean;
  isCharLimitUtf8?: boolean;
  showTreeView?: boolean;
  showTableOfContents?: boolean;
  shouldUseLexicalContextMenu?: boolean;
  shouldPreserveNewLinesInMarkdown?: boolean;
  tableCellMerge?: boolean;
  tableCellBackgroundColor?: boolean;
  tableHorizontalScroll?: boolean;
  shouldAllowHighlightingWithBrackets?: boolean;
  selectionAlwaysOnDisplay?: boolean;
  listStrictIndent?: boolean;
}

export default function AdvancedEditor({
  isRichText = true,
  isCollab = false,
  isCodeHighlighted = true,
  isCodeShiki = false,
  isAutocomplete = false,
  isMaxLength = false,
  isCharLimit = false,
  hasLinkAttributes = false,
  isCharLimitUtf8 = false,
  showTreeView = false,
  showTableOfContents = false,
  shouldUseLexicalContextMenu = false,
  shouldPreserveNewLinesInMarkdown = false,
  tableCellMerge = true,
  tableCellBackgroundColor = true,
  tableHorizontalScroll = false,
  shouldAllowHighlightingWithBrackets = false,
  selectionAlwaysOnDisplay = false,
  listStrictIndent = false,
}: AdvancedEditorProps): JSX.Element {
  const isEditable = useLexicalEditable();
  const placeholder = isCollab
    ? 'Enter some collaborative rich text...'
    : isRichText
      ? 'Enter some rich text...'
      : 'Enter some plain text...';
  
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);

    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  const initialConfig = {
    editorState: isCollab
      ? null
      : isRichText
        ? $prepopulatedRichText
        : undefined,
    namespace: 'AdvancedEditor',
    nodes: PlaygroundNodes,
    onError,
    theme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        isRichText && <SimpleToolbar />
        <div className={`editor-container ${showTreeView ? 'tree-view' : ''} ${!isRichText ? 'plain-text' : ''}`}>
          <AutoFocusPlugin />
          {selectionAlwaysOnDisplay && <SelectionAlwaysOnDisplay />}
          <ClearEditorPlugin />
          
          {isRichText ? (
            <>
              <HistoryPlugin />
              <RichTextPlugin
                contentEditable={
                  <div className="editor-scroller">
                    <div className="editor" ref={onRef}>
                      <ContentEditable data-placeholder={placeholder} />
                    </div>
                  </div>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <MarkdownShortcutPlugin />
              <ListPlugin hasStrictIndent={listStrictIndent} />
              <CheckListPlugin />
              <TablePlugin
                hasCellMerge={tableCellMerge}
                hasCellBackgroundColor={tableCellBackgroundColor}
                hasHorizontalScroll={tableHorizontalScroll}
              />
              {
                hasLinkAttributes ? (
                  <LinkPlugin />
                ): (
                  <></>
                )
              }
              <HashtagPlugin />
              <ClickableLinkPlugin disabled={isEditable} />
              <HorizontalRulePlugin />
              <TabIndentationPlugin maxIndent={7} />
            </>
          ) : (
            <>
              <PlainTextPlugin
                contentEditable={<ContentEditable data-placeholder={placeholder} />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
            </>
          )}
          
          {(isCharLimit || isCharLimitUtf8) && (
            <CharacterLimitPlugin
              charset={isCharLimit ? 'UTF-16' : 'UTF-8'}
              maxLength={5}
            />
          )}
        </div>
      </div>
    </LexicalComposer>
  );
}
