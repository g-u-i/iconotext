import Baobab from 'baobab';

export default new Baobab({
  // Dirty trick:
  // ************
  // Since contents#printToPDF can only print an opened window and it looks very
  // difficult to setup a valid webpage, we will print the current one.
  // The actual document to save into the PDF will be displayed when this flag
  // is true:
  __exporting: false,

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
  },

  // Document state:
  document: {
    // Sections format:
    // { text: '?HTMLString', img: '?Image', textIcon: '?int', imgIcon: '?int' }
    sections: [],

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
    // 'print' or 'screen'
    support: 'print',

    // 'a4' or 'pocket'
    format: 'a4',

    // 'landscape' or 'portait'
    orientation: 'landscape',
  },
});
