import React from 'react';

import Page from './Page.jsx';
import Cover from './Cover.jsx';

export default React.createClass({
  displayName: 'iconotexte/PDFRendering',

  /**
   * Rendering:
   * **********
   */
  renderCover() {
    const { options, pages, covers } = this.props;

    // To compute the spine's size, we use Nicolas' formula:
    //   [inside pages count] / 2  x  [inside paper's weight] / 1000
    // + [cover pages count] / 2  x  [cover paper's weight] / 1000
    const insideWeight = 115;
    const coverWeight = 350;
    const spine =
      (pages.length / 2 * insideWeight / 1000)
      + (4 / 2 * coverWeight / 1000);

    // Since the @page CSS pseudo-selector cannot depend on upper conditions,
    // there has to be only one instruction, which is why it is injection from
    // the JS sources:
    let pageWidth;
    let pageHeight;
    if (options.format === 'a4') {
      if (options.orientation === 'landscape') {
        pageWidth = 297;
        pageHeight = 210;
      } else {
        pageWidth = 210;
        pageHeight = 297;
      }
    } else if (options.format === 'pocket') {
      if (options.orientation === 'landscape') {
        pageWidth = 174.6;
        pageHeight = 107.9;
      } else {
        pageWidth = 107.9;
        pageHeight = 174.6;
      }
    }
    const size = [2 * pageWidth + spine, pageHeight]
      .map(val => Math.ceil(val) + 'mm')
      .join(' ');

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
        {
          <Cover
            spine={ spine }
            back={ covers[1] }
            front={ covers[0] }
            options={ options }
            pageWidth={ pageWidth }
            pageHeight={ pageHeight }
          />
        }
      </div>
    );
  },
  renderPages() {
    const { options, pages, range } = this.props;

    // Since the @page CSS pseudo-selector cannot depend on upper conditions,
    // there has to be only one instruction, which is why it is injection from
    // the JS sources:
    let size;
    if (options.format === 'a4') {
      size = 'a4' + (options.orientation === 'landscape' ? ' landscape' : ' portrait');
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
        {/* <style>{`
          @media print {
            @page {
              size: ${ size };
              margin: 18mm;
            }
            ${
              options.action === 'pdf' ?
                `
                @page :left {
                  margin-right: 39mm;
                }
                @page :right {
                  margin-left: 39mm;
                }
                ` :
                ''
            }
          }
        `}</style> */}
        <style>{`
          @media print {
            @page {
              size: ${ size };
            }
          }
        `}</style>

        { /* PAGES */ }
        {
          pages.map(({ img, text, className }, i) => (
            <Page
              key={ i }
              img={ img }
              text={ text }
              options={ options }
              className={ className }
              noPrint={ range && (i < range.from || i >= range.to) }
            />
          ))
        }
      </div>
    );
  },
  render() {
    return this.props.covers ? this.renderCover() : this.renderPages();
  },
});
