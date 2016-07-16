import React from 'react';
import { branch as branchMixin } from 'baobab-react/mixins';

import Section from '../components/Section.jsx';

export default React.createClass({
  displayName: 'iconotexte/Editor',
  mixins: [branchMixin],
  cursors: {
    ui: 'ui',
    sections: 'sections',
  },


  /**
   * Handlers:
   * *********
   */
  handleAppendTextSection() {
    const index = this.state.sections.length;
    this.props.actions.insertSection({ index });

    // Give the newly inserted section the focus:
    window.setTimeout(
      () => this.refs[`section-${ index }`].refs.editor.focus(),
      0
    );
  },
  handleAppendImageSection() {
    const index = this.state.sections.length;
    this.props.actions.insertSection({ index });
    this.props.actions.editSectionImage({ index });
  },
  handleInsertSection({ index, text, img }) {
    this.props.actions.insertSection({ index, text, img });

    // Give the newly inserted section the focus:
    window.setTimeout(
      () => this.refs[`section-${ index + 1 }`].refs.editor.focus(),
      0
    );
  },
  handleDeleteSection({ index }) {
    this.props.actions.deleteSection({ index });
  },
  handleChangeSectionText({ index, text }) {
    this.props.actions.updateSection({ index, updates: { text } });
  },
  handleChangeSectionImg({ index, img }) {
    this.props.actions.updateSection({ index, updates: { img } });
  },
  handleMergeAfter({ index }) {
    this.props.actions.mergeSectionAfter({ index });
  },
  handleMergeBefore({ index }) {
    this.props.actions.mergeSectionBefore({ index });

    // Give the first section the focus:
    this.refs[`section-${ index - 1 }`].refs.editor.focus();
  },

  handleEditImage({ index }) {
    this.props.actions.editSectionImage({ index });
  },


  /**
   * Rendering:
   * **********
   */
  render() {
    const { ui, sections } = this.state;

    return (
      <div data-view="editor">
        <ul>{
          sections.map((section, i) => (
            <li key={ i }>
              <Section
                ref={ `section-${ i }` }

                index={ i }
                section={ section }

                editImg={ this.handleEditImage }
                editingImg={ ui.sectionEditingImage === i }

                onNew={ this.handleInsertSection }
                onDelete={ this.handleDeleteSection }
                onChangeImg={ this.handleChangeSectionImg }
                onChangeText={ this.handleChangeSectionText }

                onMergeAfter={
                  (i < this.state.sections.length - 1) ?
                    this.handleMergeAfter :
                    null
                }
                onMergeBefore={
                  (i > 0) ?
                    this.handleMergeBefore :
                    null
                }
              />
            </li>
          ))
        }</ul>

        <div className="edit-buttons">
          <button
            onClick={ this.handleAppendImageSection }
          >
            <img src="../assets/icons/ico-edit-img-2.svg" />
          </button>
          <button
            onClick={ this.handleAppendTextSection }
          >
            <img src="../assets/icons/ico-edit-txt-2.svg" />
          </button>
        </div>
      </div>
    );
  },
});
