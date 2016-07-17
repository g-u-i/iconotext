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

    return (
      <div data-component="pdf-rendering">
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
