import React from 'react';
import { EditorState, SelectionState } from 'draft-js';
import { branch as branchMixin } from 'baobab-react/mixins';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Section from '../components/Section.jsx';
import MetaForm from '../components/MetaForm.jsx';

import { t } from '../utils/translator.js';

export default React.createClass({
  displayName: 'iconotexte/Editor',
  mixins: [branchMixin],
  cursors: {
    ui: 'ui',
    meta: ['document', 'meta'],
    sections: ['document', 'sections'],
  },


  /**
   * Handlers:
   * *********
   */
  handleAppendTextSection() {
    const index = this.state.sections.length;
    this.props.actions.sections.insert({ index });

    // Give the newly inserted section the focus:
    window.setTimeout(
      () => this.refs[`section-${ index }`].refs.editor.focus(),
      0
    );
  },
  handleAppendImageSection() {
    const index = this.state.sections.length;
    this.props.actions.sections.insert({ index });
    this.props.actions.sections.editImage({ index });
  },
  handleInsertSection({ index, text, img }) {
    this.props.actions.sections.insert({ index, text, img });

    // Give the newly inserted section the focus:
    window.setTimeout(
      () => this.refs[`section-${ index + 1 }`].refs.editor.focus(),
      0
    );
  },
  handleDeleteSection({ index }) {
    this.props.actions.sections.delete({ index });
  },
  handleChangeSectionText({ index, text }) {
    this.props.actions.sections.update({ index, updates: { text } });
  },
  handleChangeSectionImg({ index, img }) {
    this.props.actions.sections.update({ index, updates: { img } });
  },
  focusNextSection({ index }) {
    const section = this.refs[`section-${ index + 1 }`];
    section.setState({
      editorState: EditorState.acceptSelection(
        section.state.editorState,
        SelectionState.createEmpty(),
      ),
    });

    // Once the editor state has properly been reset, let's give it focus:
    setTimeout(
      () => section.refs.editor.focus(),
      0
    );
  },
  focusPreviousSection({ index }) {
    const section = this.refs[`section-${ index - 1 }`];
    section.setState({
      editorState: EditorState.moveSelectionToEnd(
        section.state.editorState,
      ),
    });

    // Once the editor state has properly been reset, let's give it focus:
    setTimeout(
      () => section.refs.editor.focus(),
      0
    );
  },
  handleMergeAfter({ index }) {
    this.props.actions.sections.mergeAfter({ index });
  },
  handleMergeBefore({ index }) {
    this.props.actions.sections.mergeBefore({ index });

    // Give the first section the focus:
    this.refs[`section-${ index - 1 }`].refs.editor.focus();
  },

  handleEditImage({ index }) {
    this.props.actions.sections.editImage({ index });
  },

  handleEditMeta(meta) {
    this.props.actions.meta.update(meta);
  },

  handleCloseWelcome() {
    this.props.actions.nav.closeWelcomeMessage();
  },


  /**
   * Rendering:
   * **********
   */
  render() {
    const { ui, meta, sections } = this.state;

    return (
      <div data-view="editor">
        <ReactCSSTransitionGroup
          transitionName="welcome"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }
        >{
          ui.welcome ?
            <div
              className="welcome-message"
              onClick={ this.handleCloseWelcome }
            >
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: t('Welcome.content'),
                }}
              />
              <button className="close-button" />
            </div> :
            undefined
        }</ReactCSSTransitionGroup>

        <MetaForm
          meta={ meta }
          onChange={ this.handleEditMeta }
          editImg={ this.handleEditImage }
          editingImg={ ui.sectionEditingImage === 'meta' }
        />

        <ul className="sections">{
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

                focusNextSection={
                  (i < this.state.sections.length - 1) ?
                    this.focusNextSection :
                    null
                }
                focusPreviousSection={
                  (i > 0) ?
                    this.focusPreviousSection :
                    null
                }

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
