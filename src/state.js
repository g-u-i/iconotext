import Baobab from 'baobab';
import { merge } from 'lodash';

import { t } from './utils/translator.js';

export default new Baobab({

  // Interface language:
  locale: 'fr-FR',

  // Current view:
  // 'editor', 'about', 'preview', etc...
  view: 'editor',

  // The "ui" branch only contains data related to UI manipulations, and are
  // not data to save:
  ui: {
    // The index of the section with the image import panel opened:
    sectionEditingImage: null,

    // During the PDF generation:
    exportingRange: null,
    exportingMethod: null, // 'print' or 'pdf'

    // True if modifications have been added since last document save:
    unsave: false,

    // While loading a document, specifies the name of the file:
    loading: null,

    // The basename of the latest saved or loaded file:
    basename: null,

    // True as long as the user has not closed the welcome message or changed
    // the page:
    welcome: true,
  },

  // Document state:
  document: {
    // Sections format:
    // { text: '?HTMLString', img: '?Image', textIcon: '?int', imgIcon: '?int' }
    sections: [
      // Initial empty section
      {
        img: null,
        text: '',
        imgIcon: 1,
        textIcon: 1,
      },
    ],

    // Document metadata:
    //   - title
    //   - image
    //   - imageDescription
    //   - textDescription
    //   - editor
    //   - author
    //   - date
    meta: [],
  },

  // Publication settings:
  publish: {
    // 'title', 'caption' or 'bubble'
    textPosition: 'title',

    // 'pdf' or 'lulu'
    action: 'pdf',

    // 'print' or 'screen'
    support: 'print',

    // 'a4' or 'pocket'
    format: 'a4',

    // 'portrait' or 'landscape'
    orientation: 'portrait',

    // every pages to print:
    pages: Baobab.monkey({
      cursors: {
        view: ['view'],
        locale: ['locale'],
        meta: ['document', 'meta'],
        support: ['publish', 'support'],
        sections: ['document', 'sections'],
      },
      get({ view, support, sections, meta }) {
        if (view !== 'publish') return [];

        const pages = [];

        // Insert blank pages if needed for print:
        if (support === 'print') {
          // 1. Cover will be inserted in JSX (different attributes)
          pages.push({
            img: meta.image,
            className: 'page page--cover',
            text: ['title','date','editor'].map(f => {
              return meta[f] ? '<p class="text__'+f+'">'+meta[f].replace(/<(?:.|\n)*?>/gm, '')+'</p>' : '';
            }).join(''),
          });

          // 2. Inside the front cover (empty):
          pages.push({className:'page page--empty'});

          // 3. First inside recto (empty):
          pages.push({className:'page page--empty'});

          // 4. Second inside verso (empty):
          pages.push({className:'page page--empty'});

          // 5. Document Sleeve:
          const creditsPage = {
            className: 'page page--sleeve',
            text: ['title','imageDescription','textDescription'].map(f => {
              return meta[f] ? '<p class="text__'+f+'">'+meta[f].replace(/<(?:.|\n)*?>/gm, '')+'</p>' : '';
            }).join(''),
          };

          pages.push(creditsPage);

          // 6. Verso credits (empty):
          pages.push({className:'page page--empty'});

          // 7. Recto / verso printing for actual page contents:
          sections.forEach(p => pages.push(
            _.merge({
              className:'page page--default'
            },p)
          ));

          // 8. Project credits:
          //   -> Insert a page if needed, to ensure this page is on recto:
          if ((sections.length % 2)) pages.push({className:'page page--empty'});

          pages.push({
            className: 'page page--credits',
            text: t('pages.pitch'),
          });

          pages.push({className:'page page--empty'});

          pages.push({
            className: 'page page--credits',
            text: t('pages.credits'),
          });

          pages.push({className:'page page--empty'});

          // 9. Back cover (recto, empty):
          pages.push(creditsPage);

          // 10. Back cover (verso, empty):
          pages.push({className:'page page--empty'});

        // Add nothing for screens:
        } else {
          sections.forEach(p => pages.push(p));
        }

        return pages;
      },
    }),
  },
});
