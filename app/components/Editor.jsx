import React from 'react';
import { branch as branchMixin } from 'baobab-react/mixins';

import Section from './Editor.Section.jsx';

import styles from './Editor.css';

export default React.createClass({
  displayName: 'iconotexte/Editor',
  mixins: [branchMixin],
  cursors: {
    sections: 'sections',
  },


  /**
   * Handlers:
   * *********
   */
  handleAppendSection() {
    this.props.actions.insertSection({
      index: this.state.sections.length - 1,
    });
  },
  handleInsertSection({ index, text, img }) {
    this.props.actions.insertSection({ index, text, img });
  },
  handleDeleteSection({ index }) {
    this.props.actions.deleteSection({ index });
  },
  handleChangeSectionText({ index, text }) {
    this.props.actions.updateSection({ index, updates: { text } });
  },
  handleChangeSectionImage({ index, img }) {
    this.props.actions.updateSection({ index, updates: { img } });
  },


  /**
   * Rendering:
   * **********
   */
  render() {
    const { sections } = this.state;

    return (
      <div className={ styles.editor }>
        <ul>{
          sections.map((section, i) => (
            <li key={ i }>
              <Section
                index={ i }
                section={ section }

                onNew={ this.handleInsertSection }
                onDelete={ this.handleDeleteSection }
                onChangeText={ this.handleChangeSectionText }
                onChangeImage={ this.handleChangeSectionImage }
              />
            </li>
          ))
        }</ul>

        <button
          className="add-section"
          onClick={ this.handleAppendSection }
        />
      </div>
    );
  },
});
