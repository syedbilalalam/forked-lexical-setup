import React, { useState } from 'react';
import BasicEditor from './BasicEditor';
import AdvancedEditor from './AdvancedEditor';
import './App.css';

function App() {
  const [editorType, setEditorType] = useState<'basic' | 'advanced'>('basic');
  const [settings, setSettings] = useState({
    isRichText: true,
    isCollab: false,
    isCodeHighlighted: true,
    isCodeShiki: false,
    isAutocomplete: false,
    isMaxLength: false,
    isCharLimit: false,
    hasLinkAttributes: false,
    isCharLimitUtf8: false,
    showTreeView: false,
    showTableOfContents: false,
    shouldUseLexicalContextMenu: false,
    shouldPreserveNewLinesInMarkdown: false,
    tableCellMerge: true,
    tableCellBackgroundColor: true,
    tableHorizontalScroll: false,
    shouldAllowHighlightingWithBrackets: false,
    selectionAlwaysOnDisplay: false,
    listStrictIndent: false,
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Lexical Editor Examples</h1>
        <p>Choose between a basic editor or the full-featured advanced editor</p>
        
        <div className="editor-selector">
          <button
            className={editorType === 'basic' ? 'active' : ''}
            onClick={() => setEditorType('basic')}
          >
            Basic Editor
          </button>
          <button
            className={editorType === 'advanced' ? 'active' : ''}
            onClick={() => setEditorType('advanced')}
          >
            Advanced Editor
          </button>
        </div>
      </header>

      <main className="app-main">
        {editorType === 'basic' ? (
          <div className="editor-section">
            <h2>Basic Lexical Editor</h2>
            <p>This editor includes core Lexical features: rich text formatting, lists, links, tables, and basic plugins.</p>
            <BasicEditor />
          </div>
        ) : (
          <div className="editor-section">
            <h2>Advanced Lexical Editor</h2>
            <p>This editor includes all features from the Lexical playground: collaborative editing, code highlighting, images, emojis, and much more!</p>
            
            <div className="settings-panel">
              <h3>Settings</h3>
              <div className="settings-grid">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.isRichText}
                    onChange={(e) => setSettings({...settings, isRichText: e.target.checked})}
                  />
                  Rich Text Mode
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={settings.isCollab}
                    onChange={(e) => setSettings({...settings, isCollab: e.target.checked})}
                  />
                  Collaborative Editing
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={settings.isCodeHighlighted}
                    onChange={(e) => setSettings({...settings, isCodeHighlighted: e.target.checked})}
                  />
                  Code Highlighting
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={settings.showTreeView}
                    onChange={(e) => setSettings({...settings, showTreeView: e.target.checked})}
                  />
                  Show Tree View
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={settings.showTableOfContents}
                    onChange={(e) => setSettings({...settings, showTableOfContents: e.target.checked})}
                  />
                  Show Table of Contents
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={settings.isAutocomplete}
                    onChange={(e) => setSettings({...settings, isAutocomplete: e.target.checked})}
                  />
                  Autocomplete
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={settings.isMaxLength}
                    onChange={(e) => setSettings({...settings, isMaxLength: e.target.checked})}
                  />
                  Max Length (30 chars)
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={settings.isCharLimit}
                    onChange={(e) => setSettings({...settings, isCharLimit: e.target.checked})}
                  />
                  Character Limit (5 chars)
                </label>
              </div>
            </div>
            
            <AdvancedEditor {...settings} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Built with <a href="https://lexical.dev" target="_blank" rel="noopener noreferrer">Lexical</a> - 
          An extensible text editor framework by Meta
        </p>
      </footer>
    </div>
  );
}

export default App;
