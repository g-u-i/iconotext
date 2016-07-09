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
    this.handleInsertSection({
      index: this.state.sections.length,
    });
  },
  handleInsertSection({ index }) {
    const sections = this.state.sections.slice(0);

    sections.splice(index, 0, { text: '', img: null });
    this.props.actions.updateSections(sections);
  },
  handleDeleteSection({ index }) {
    const sections = this.state.sections.slice(0);

    sections.splice(index, 1);
    this.props.actions.updateSections(sections);
  },
  handleChangeSectionText({ index, text }) {
    const sections = this.state.sections.slice(0);

    sections[index] = {
      text,
      img: sections[index].img,
    };
    this.props.actions.updateSections(sections);
  },
  handleChangeSectionImage({ index, img }) {
    const sections = this.state.sections.slice(0);

    sections[index] = {
      img,
      text: sections[index].text,
    };
    this.props.actions.updateSections(sections);
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
