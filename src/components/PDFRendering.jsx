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

    const printPages = [];
    // Insert blank pages if needed for print:
    if (options.support === 'print') {
      // 1. Cover will be inserted in JSX (different attributes)

      // 2. Inside the front cover (empty):
      printPages.push({});

      // 3. First inside recto (empty):
      printPages.push({});

      // 4. Second inside verso (empty):
      printPages.push({});

      // 5. Document credits:
      printPages.push({
        className: 'credits',
        text: [
          cover.imageDescription,
          cover.textDescription,
          cover.author,
          cover.date,
        ].filter(s => !!(s || '').trim()).join('<br />'),
      });

      // 6. Verso credits (empty):
      printPages.push({});

      // 7. Recto / verso printing for actual page contents:
      pages.forEach(p => printPages.push(p));

      // 8. Project credits:
      //   -> Insert a page if needed, to ensure this page is on verso:
      if (!(pages.length % 2)) printPages.push({});
      printPages.push({
        className: 'credits',
        text: [
          /* eslint-disable */
          'Iconotexte est un projet de Benoît Verjat et Nicolas Couturier (association &&)',
          'Production Cneai=, en partenariat avec la Fondation Daniel et Nina Carasso',
          'Édition du site avec Tanguy Wermelinger',
          'Développement de l’application g.u.i. avec Alexis Jacomy',
          'Licence Creative Commons, libre de diffusion — Attribution — Pas d’utilisation commerciale — Partage des conditions initiales à l’identique',
          'CC BY-NC-SA 4.0, && - Cneai, 2016, France',
          'iconotexte.et-et.xyz',
          /* eslint-enable */
        ].join('<br />'),
      });

      // 9. Back cover (recto, empty):
      printPages.push({});

      // 10. Back cover (verso, empty):
      printPages.push({});

    // Add nothing for screens:
    } else {
      pages.forEach(p => printPages.push(p));
    }

    return (
      <div data-component="pdf-rendering">
        { /* PRINT SPECIFIC CSS CONDITIONAL RULES */ }
        <style>{`
          @media print {
            @page {
              size: ${ size };
              margin: 18mm;
            }
          }
        `}</style>

        { /* COVER */ }
        <Page
          className="cover"
          img={ cover.image }
          text={ cover.title }
          options={ options }
        />

        { /* PAGES */ }
        {
          printPages.map(({ img, text, className }, i) => (
            <Page
              key={ i }
              img={ img }
              text={ text }
              options={ options }
              className={ className }
            />
          ))
        }
      </div>
    );
  },
});
