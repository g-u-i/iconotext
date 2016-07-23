import React from 'react';

import Page from './Page.jsx';

export default React.createClass({
  displayName: 'iconotexte/PDFRendering',

  /**
   * Rendering:
   * **********
   */
  render() {
    const { options, cover, pages } = this.props;

    // Since the @page CSS pseudo-selector cannot depend on upper conditions,
    // there has to be only one instruction, which is why it is injection from
    // the JS sources:
    let size;
    if (options.format === 'a4') {
      size = 'a4' + (options.orientation === 'landscape' ? ' landscape' : '');
    } else if (options.format === 'pocket') {
      if (options.orientation === 'landscape') {
        size = '17.46cm 10.79cm';
      } else {
        size = '10.79cm 17.46cm';
      }
    }

    return (
      <div data-component="pdf-rendering">
        { /* PRINT SPECIFIC CSS CONDITIONAL RULES */ }
        <style>{`
          @media print {
            @page {
              size: ${ size };
            }
          }
        `}</style>

        { /* COVER */ }
        <Page
          cover
          img={ cover.image }
          text={ cover.title }
          options={ options }
        />

        { /* PAGES */ }
        {
          pages.map(({ img, text }, i) => (
            <Page
              key={ i }
              img={ img }
              text={ text }
              options={ options }
            />
          ))
        }
      </div>
    );
  },
});
