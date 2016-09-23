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
    pages: ['publish', 'pages'],
    range: ['ui', 'exportingRange'],
    method: ['ui', 'exportingMethod'],
  },

  /**
   * Handlers:
   * *********
   */
  handlePrint() {
    this.props.actions.publish.print();
  },
  handleExportPDF() {
    this.props.actions.publish.pdf();
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
    const { publish, pages, range, method } = this.state;

    // Export message:
    let message;
    if (range) {
      // Case 1: Full range:
      if (method === 'print') {
        message = (
          <div className="export-message">
            <div className="wrapper">
              <div
                className="message"
                dangerouslySetInnerHTML={{
                  __html: t('Publish.printMessage'),
                }}
              />
            </div>
          </div>
        );

      // Case 2: Partial range:
      } else {
        const progress = Math.round(range.from / pages.length * 100);

        message = (
          <div className="export-message">
            <div className="wrapper">
              <div
                className="message"
                dangerouslySetInnerHTML={{
                  __html: t('Publish.pdfMessage', { progress }),
                }}
              />
            </div>
          </div>
        );
      }
    }

    return (
      <div data-view="publish">
        <div className="preview">
          <PDFRendering
            range={ range }
            pages={ pages }
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
            className="action"
            onClick={ this.handlePrint }
          >
            <button>
              <img src="../assets/icons/ico-export-1.svg" />
            </button>
            <label>{ t('buttons.print') }</label>
          </div>

          <div
            className="action"
            onClick={ this.handleExportPDF }
          >
            <button>
              <img src="../assets/icons/ico-save-1.svg" />
            </button>
            <label>{ t('buttons.export') }</label>
          </div>
        </div>

        { message }
      </div>
    );
  },
});