import _ from 'lodash';
import React from 'react';
import { branch as branchMixin } from 'baobab-react/mixins';

import PDFRendering from '../components/PDFRendering.jsx';
import { t } from '../utils/translator.js';

const OPTIONS = [
  {
    id: 'textPosition',
    values: ['title', 'caption', 'bubble'],
  },
  {
    id: 'support',
    values: ['print', 'screen'],
  },
  {
    id: 'action',
    values: ['pdf', 'lulu'],
  },
  {
    id: 'orientation',
    values: ['portrait', 'landscape'],
  },
  {
    id: 'format',
    values: ['a4', 'pocket'],
  },
];

// A serie of uncompatible option setups:
const OPTIONS_FORBIDDEN = [
  { orientation: 'portrait', support: 'screen' },
  { support: 'screen', format: 'pocket' },
  { action: 'images', orientation: 'portrait' },
  { action: 'images', format: 'pocket' },
  { action: 'images', support: 'print' },
  { action: 'pdf', support: 'screen' },
  { action: 'pdf', format: 'pocket' },
  { action: 'lulu', support: 'screen' },
];

export default React.createClass({
  displayName: 'iconotexte/Publish',
  mixins: [branchMixin],
  cursors: {
    publish: ['publish'],
    meta: ['document', 'meta'],
    exporting: ['ui', 'exporting'],
    sections: ['document', 'sections'],
  },

  /**
   * Handlers:
   * *********
   */
  onPrint() {
    const action = this.state.publish.action;
    this.props.actions.publish[action]();
  },
  onSelectOption(e) {
    const target = e.currentTarget;
    const option = target.name.replace('Publish.options.', '');
    const value = target.value;

    this.props.actions.publish.updateOptions({ option, value });
  },

  /**
   * Rendering:
   * **********
   */
  render() {
    const { publish, meta, sections, exporting } = this.state;

    return (
      <div data-view="publish">
        <div className="preview">
          <PDFRendering
            cover={ meta }
            pages={ sections }
            options={ publish }
          />
        </div>

        <div className="panel">
          <ul className="options">{
            OPTIONS.map(({ id, values }) => (
              <li
                key={ id }
                className="option"
                data-option={ id }
                data-value={ publish[id] }
              >
                <div className="icon" />
                <ul className="values">{
                  values.map(value => (
                    <li key={ value }>
                      <input
                        type="radio"
                        value={ value }
                        onChange={ this.onSelectOption }
                        checked={ publish[id] === value }
                        name={ `Publish.options.${ id }` }
                        id={ `Publish.options.${ id }.${ value }` }
                        disabled={
                          OPTIONS_FORBIDDEN.some(o => (
                            o[id] === value &&
                            _.some(
                              _.omit(o, [id]),
                              (val, key) => publish[key] === val
                            )
                          ))
                        }
                      />
                      <label htmlFor={ `Publish.options.${ id }.${ value }` }>{
                        t(`Publish.options.${ id }:${ value }`)
                      }</label>
                    </li>
                  ))
                }</ul>
              </li>
            ))
          }</ul>

          <div
            className="print"
            onClick={ this.onPrint }
          >
            <button>
              <img src="../assets/icons/ico-export-1.svg" />
            </button>
            <label>{ t('buttons.print') }</label>
          </div>
        </div>

        {
          exporting ?
            <div className="export-message">
              <div className="wrapper">
                <div
                  className="message"
                  dangerouslySetInnerHTML={{
                    __html: t('Publish.exportMessage'),
                  }}
                />
              </div>
            </div> :
            undefined
        }
      </div>
    );
  },
});
