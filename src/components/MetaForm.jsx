import React from 'react';
import { defaults } from 'lodash';

import Section from './Section.jsx';
import { t } from '../utils/translator.js';

export default React.createClass({
  displayName: 'iconotexte/MetaForm',

  onChange(e) {
    const target = e.currentTarget;
    const value = target.value;
    const field = target.getAttribute('data-field');

    this.props.onChange(
      defaults(
        { [field]: value },
        this.props.meta || {}
      )
    );
  },
  handleEditImage() {

  },
  handleChangeText({ text }) {
    this.props.onChange(
      defaults(
        { title: text },
        this.props.meta || {}
      )
    );
  },
  handleChangeImg({ img = null }) {
    this.props.onChange(
      defaults(
        { image: img },
        this.props.meta || {}
      )
    );
  },

  renderInput(field) {
    return (
      <input
        type="text"
        key={ field }
        data-field={ field }
        onChange={ this.onChange }
        value={ this.props.meta[field] || '' }
        placeholder={ t(`MetaForm.${ field }`) }
        data-tooltip={ t(`buttons.${ field }`) }
      />
    );
  },
  render() {
    const { editingImg, meta = {} } = this.props;

    return (
      <div data-component="meta-form">
        <Section
          index="meta"
          section={ {
            img: meta.image,
            text: meta.title || '',
          } }

          editingImg={ editingImg }
          editImg={ this.props.editImg }
          onChangeImg={ this.handleChangeImg }
          onChangeText={ this.handleChangeText }
          placeholder={ t('MetaForm.title') }
        />

        <fieldset className="description">{
          [
            this.renderInput('imageDescription'),
            this.renderInput('textDescription'),
          ]
        }</fieldset>

        <fieldset className="author">{
          this.renderInput('author')
        }</fieldset>

        <fieldset className="date">{
          this.renderInput('date')
        }</fieldset>
      </div>
    );
  },
});
