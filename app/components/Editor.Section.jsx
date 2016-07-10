import React from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';

import styles from './Editor.Section.css';
import ImageBlock from './ImageBlock.jsx';
import { t } from '../utils/translator.js';

const PARAGRAPH_SEP = '\n\n';

export default React.createClass({
  displayName: 'iconotexte/Editor.Section',

  /**
   * Lifecycle:
   * **********
   */
  getInitialState() {
    return {
      editorState: EditorState.createWithContent(
        ContentState.createFromText('')
      ),
    };
  },
  componentWillReceiveProps({ section: { text } }) {
    const { editorState } = this.state;
    const currentText = editorState
      .getCurrentContent()
      .getPlainText();

    if (text !== currentText) {
      this.setState({
        editorState: EditorState.createWithContent(
          ContentState.createFromText(text)
        ),
      });
    }
  },

  /**
   * Handlers:
   * *********
   */
  onChange(editorState) {
    let newText = editorState
      .getCurrentContent()
      .getPlainText();

    if (newText !== this.props.section.text) {
      // Split the section if new paragraph:
      if (~newText.indexOf(PARAGRAPH_SEP)) {
        const splitted = newText.split(PARAGRAPH_SEP);
        newText = splitted[0];

        // Insert new section:
        this.props.onNew({
          index: this.props.index,
          text: splitted.slice(1).join(PARAGRAPH_SEP),
        });
      }

      // Update current section else:
      this.props.onChangeText({
        index: this.props.index,
        text: newText,
      });
    }

    // Manually reset the current editor state to preserve the full editor
    // state:
    this.setState({ editorState });
  },
  onKeyCommand(e) {
    // TODO:
    // This feature is disabled at the moment (check Editor props).
    // The issues to solve are:
    //   1. If the cursor is at the beginning of a line (I guess an internal
    //      block?), then startOffset is 0.
    //   2. If there is a line break in the paragraph, then endOffset is not
    //      equal to the text length.

    const { editorState } = this.state;
    const selectionState = editorState.getSelection();

    const startOffset = selectionState.getStartOffset();
    const endOffset = selectionState.getEndOffset();
    const selectionLength = endOffset - startOffset;
    const textLength = editorState
      .getCurrentContent()
      .getPlainText()
      .length;

    // When pressing "backspace" at the beginning of the section, it will merge
    // it with the previous one:
    if (
      e === 'backspace' &&
      selectionLength === 0 &&
      startOffset === 0
    ) {
      this.props.onMergeBefore({ index: this.props.index });
      return true;
    }

    // When pressing "delete" at the end of the section, it will merge it with
    // the next one:
    if (
      e === 'delete' &&
      selectionLength === 0 &&
      endOffset === textLength
    ) {
      this.props.onMergeAfter({ index: this.props.index });
      return true;
    }

    return false;
  },

  /**
   * Rendering:
   * **********
   */
  render() {
    const { section } = this.props;

    return (
      <div className={ styles.editorSection }>
        <div className={ styles.editorSection_wrapper }>
          {
            section.img ?
              <ImageBlock img={ section.img } /> :
              undefined
          }
        </div>
        <div className={ styles.editorSection_wrapper }>
          <div className={ `${ styles.editorSection_text } block` }>
            <Editor
              ref="editor"
              placeholder={ t('Editor.Section.placeholder') }
              onChange={ this.onChange }
              handleKeyCommand={ null /* this.onKeyCommand */ }
              editorState={ this.state.editorState }
            />
          </div>
        </div>
      </div>
    );
  },
});
