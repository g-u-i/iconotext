import React from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';

import styles from './Editor.Section.css';
import ImageBlock from './ImageBlock.jsx';

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
    const newText = editorState
      .getCurrentContent()
      .getPlainText();

    if (newText !== this.props.section.text) {
      this.props.onChangeText({
        index: this.props.index,
        text: newText,
      });
      this.setState({ editorState });
    }
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
          <ImageBlock img={ section.img } />
        </div>
        <div className={ styles.editorSection_wrapper }>
          <div className="block">
            <Editor
              onChange={ this.onChange }
              editorState={ this.state.editorState }
            />
          </div>
        </div>
      </div>
    );
  },
});
