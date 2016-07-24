import _ from 'lodash';
import React from 'react';
import { branch as branchMixin } from 'baobab-react/mixins';

import PDFRendering from '../components/PDFRendering.jsx';
import { t } from '../utils/translator.js';

const ACTIONS = [
  'exportPdf',
  'exportLulu',
  'exportImgs',
];

const OPTIONS = [
  {
    id: 'support',
    values: ['print', 'screen'],
  },
  {
    id: 'format',
    values: ['a4', 'pocket'],
  },
  {
    id: 'orientation',
    values: ['portrait', 'landscape'],
  },
];

// A serie of uncompatible option setups:
const OPTIONS_FORBIDDEN = [
  { orientation: 'portrait', support: 'screen' },
  { support: 'screen', format: 'pocket' },
];

// A serie of uncompatible action / option setups:
const ACTIONS_FORBIDDEN = [
  { action: 'exportImgs', orientation: 'portrait' },
  { action: 'exportImgs', format: 'pocket' },
  { action: 'exportImgs', support: 'print' },
  { action: 'exportPdf', support: 'screen' },
  { action: 'exportPdf', format: 'pocket' },
  { action: 'exportLulu', support: 'screen' },
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
  onClickAction(e) {
    const target = e.currentTarget;
    const action = target.getAttribute('data-action');

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

        <div className="description">
        </div>

        <ul className="actions">{
          ACTIONS.map(id => (
            <li
              key={ id }
              data-action={ id }
              onClick={ this.onClickAction }
              disabled={
                ACTIONS_FORBIDDEN.some(o => (
                  o.action === id &&
                  _.some(
                    _.omit(o, ['action']),
                    (val, key) => publish[key] === val
                  )
                ))
              }
            >
              <div className="icon" />
              <div className="label">{
                t(`Publish.actions.${ id }`)
              }</div>
            </li>
          ))
        }</ul>

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

        {
          exporting ?
            <div className="export-message">
              <div className="wrapper">
                <div className="message">{ t('Publish.exportMessage') }</div>
              </div>
            </div> :
            undefined
        }
      </div>
    );
  },
});
