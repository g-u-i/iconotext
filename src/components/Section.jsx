import React from 'react';
import ReactDOM from 'react-dom';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import {
  Editor,
  RichUtils,
  EditorState,
  ContentState,
  SelectionState,
} from 'draft-js';

import ImageBlock from './ImageBlock.jsx';
import ImageBlockEdit from './ImageBlockEdit.jsx';
import InlineToolbar from './InlineToolbar.jsx';

import { t } from '../utils/translator.js';
import selectionUtils from '../utils/selection.js';

const PARAGRAPH_REGEXP = /\n<p><br><\/p>\n/;
const PARAGRAPH_EMPTY = '<p><br></p>';

export default React.createClass({
  displayName: 'iconotexte/Section',

  /**
   * Lifecycle:
   * **********
   */
  getInitialState() {
    const { text } = this.props.section;

    return {
      showToolbar: false,
      toolbarPosition: null,
      editorState: EditorState.createWithContent(
        text ?
          this.setHTMLText(text) :
          ContentState.createFromText('')
      ),
    };
  },
  componentWillReceiveProps({ section: { text } }) {
    const { editorState } = this.state;
    const currentText = this.getHTMLText(editorState.getCurrentContent());

    if (text !== currentText) {
      this.setState({
        editorState: EditorState.createWithContent(this.setHTMLText(text)),
      });
    }
  },
  componentDidMount() {
    document.body.addEventListener('click', this.onClickBody);
  },
  componentWillUnmount() {
    document.body.removeEventListener('click', this.onClickBody);
  },

  /**
   * Helpers:
   * ********
   */
  setHTMLText(html) {
    const contentState = stateFromHTML(html);
    return contentState;
  },
  getHTMLText(contentState) {
    const html = stateToHTML(contentState);
    return html;
  },

  /**
   * Handlers:
   * *********
   */
  onUpArrow() {
    const range = selectionUtils.getSelectionRange();

    if (!range) return;

    const editorBounds = this.refs.editorWrapper.getBoundingClientRect();
    const rangeBounds = range.getBoundingClientRect();
    const diff = editorBounds.top - rangeBounds.top;

    if (
      this.props.focusPreviousSection &&
      (Math.abs(diff) < 10 || this.props.section.text === PARAGRAPH_EMPTY)
    ) {
      this.props.focusPreviousSection({ index: this.props.index });
    }
  },
  onDownArrow() {
    const range = selectionUtils.getSelectionRange();

    if (!range) return;

    const editorBounds = this.refs.editorWrapper.getBoundingClientRect();
    const rangeBounds = range.getBoundingClientRect();
    const diff = editorBounds.bottom - rangeBounds.bottom;

    if (
      this.props.focusNextSection &&
      (Math.abs(diff) < 10 || this.props.section.text === PARAGRAPH_EMPTY)
    ) {
      this.props.focusNextSection({ index: this.props.index });
    }
  },
  onClickBody(e) {
    if (!this.props.editingImg) {
      return;
    }

    const dom = ReactDOM.findDOMNode(this);
    let node = e.target;
    let isOut = true;

    while (node) {
      if (node === dom) {
        isOut = false;
        break;
      }

      node = node.parentNode;
    }

    if (isOut) {
      this.props.editImg({ index: null });
    }
  },
  onClickEditImg() {
    this.props.editImg({ index: this.props.index });
  },
  onClickText() {
    this.refs.editor.focus();
  },
  toggleInlineStyle(inlineStyle) {
    this.onChangeText(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  },
  onChangeImg(img) {
    this.props.onChangeImg({
      img,
      index: this.props.index,
    });
    this.props.editImg({ index: null });
  },
  onTextBlur() {
    if (this.state.showToolbar) {
      this.setState({
        // Hide toolbar:
        showToolbar: false,
        editorState: EditorState.acceptSelection(
          this.state.editorState,
          SelectionState.createEmpty(),
        ),
      });
    }
  },
  onChangeText(editorState) {
    const hasFocus = editorState.getSelection().getHasFocus();
    let newText = this.getHTMLText(editorState.getCurrentContent());

    // In the specific case of focus losing while showing the toolbar, the
    // onTextBlur handler will deal with the state update:
    if (!hasFocus && this.state.showToolbar) return;

    // Check selection:
    if (
      hasFocus &&
      !editorState.getSelection().isCollapsed() &&
      selectionUtils.getSelectionRange()
    ) {
      const selectionRange = selectionUtils.getSelectionRange();
      const selectionCoords = selectionUtils.getSelectionCoords(
        selectionRange,
        this.refs.text
      );

      this.setState({
        showToolbar: true,
        toolbarPosition: {
          top: selectionCoords.offsetTop,
          left: selectionCoords.offsetLeft,
        },
      });
    } else {
      this.setState({
        showToolbar: false,
      });
    }

    // Check if text has been updated:
    if (hasFocus && newText !== this.props.section.text) {
      // Split the section if new paragraph:
      if (
        newText.match(PARAGRAPH_REGEXP) &&
        // The following test is about that:
        // https://github.com/sstur/draft-js-export-html/issues/25
        newText !== PARAGRAPH_EMPTY
      ) {
        const splitted = newText.split(PARAGRAPH_REGEXP);
        newText = splitted.shift();

        // Insert new section:
        while (splitted.length) {
          this.props.onNew({
            index: this.props.index,
            text: splitted.pop(),
          });
        }
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
    const { editorState } = this.state;
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    const isCollapsed = selectionState.isCollapsed();
    const isFirstBlock =
      contentState.getFirstBlock().getKey() === selectionState.getStartKey();
    const isLastBlock =
      contentState.getLastBlock().getKey() === selectionState.getEndKey();
    const isBlockStart =
      selectionState.getStartOffset() === 0;
    const isBlockEnd =
      selectionState.getEndOffset() === contentState.getLastBlock().getLength();

    // When pressing "backspace" at the beginning of the section, it will merge
    // it with the previous one:
    if (
      e === 'backspace' &&
      isCollapsed &&
      isFirstBlock &&
      isBlockStart &&
      this.props.onMergeBefore
    ) {
      this.props.onMergeBefore({ index: this.props.index });
      return true;
    }

    // When pressing "delete" at the end of the section, it will merge it with
    // the next one:
    if (
      e === 'delete' &&
      isCollapsed &&
      isLastBlock &&
      isBlockEnd &&
      this.props.onMergeAfter
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
    const { section, editingImg, placeholder } = this.props;
    const { img, text, imgIcon = 1 } = section;

    return (
      <div
        data-component="section"
        data-full={ !!(img && text && text !== PARAGRAPH_EMPTY) || undefined }
      >
        <div className="wrapper">
          <div className="img">
            {
              (img && !editingImg) ?
                <ImageBlock
                  img={ img }
                  onDelete={ this.onChangeImg }
                /> :
                undefined
            }
            {
              editingImg ?
                <ImageBlockEdit
                  img={ img }
                  setImg={ this.onChangeImg }
                /> :
                undefined
            }
          </div>
        </div>

        <div className="icons">
          {
            (!editingImg && !img) ?
              <button onClick={ this.onClickEditImg }>
                <img src={ `../assets/icons/ico-edit-img-${ imgIcon }.svg` } />
              </button> :
              null
          }
        </div>

        <div className="wrapper">
          <div
            ref="text"
            className="text"
            onClick={ this.onClickText }
          >
            {
              this.state.showToolbar ?
                <InlineToolbar
                  onToggle={ this.toggleInlineStyle }
                  editorState={ this.state.editorState }
                  position={ this.state.toolbarPosition }
                /> :
                null
            }
            <div ref="editorWrapper">
              <Editor
                ref="editor"
                onBlur={ this.onTextBlur }
                onUpArrow={ this.onUpArrow }
                onChange={ this.onChangeText }
                onDownArrow={ this.onDownArrow }
                handleKeyCommand={ this.onKeyCommand }
                editorState={ this.state.editorState }
                placeholder={
                  placeholder || t('Editor.Section.placeholder')
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
});
