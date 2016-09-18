import Baobab from 'baobab';

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
            text: meta.title,
            className: 'cover',
          });

          // 2. Inside the front cover (empty):
          pages.push({});

          // 3. First inside recto (empty):
          pages.push({});

          // 4. Second inside verso (empty):
          pages.push({});

          // 5. Document credits:
          pages.push({
            className: 'credits',
            text: [
              meta.imageDescription,
              meta.textDescription,
              meta.author,
              meta.date,
            ].filter(s => !!(s || '').trim()).join('<br />'),
          });

          // 6. Verso credits (empty):
          pages.push({});

          // 7. Recto / verso printing for actual page contents:
          sections.forEach(p => pages.push(p));

          // 8. Project credits:
          //   -> Insert a page if needed, to ensure this page is on verso:
          if (!(sections.length % 2)) pages.push({});
          pages.push({
            className: 'credits',
            text: t('pages.credits'),
          });

          // 9. Back cover (recto, empty):
          pages.push({});

          // 10. Back cover (verso, empty):
          pages.push({});

        // Add nothing for screens:
        } else {
          sections.forEach(p => pages.push(p));
        }

        return pages;
      },
    }),
  },
});
