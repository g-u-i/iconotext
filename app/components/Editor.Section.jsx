import React from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';

import styles from './Editor.Section.css';
import ImageBlock from './ImageBlock.jsx';

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

      // Manually reset the current editor state to preserve the full editor
      // state:
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
              onChange={ this.onChange }
              editorState={ this.state.editorState }
            />
          </div>
        </div>
      </div>
    );
  },
});
