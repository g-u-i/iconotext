import Baobab from 'baobab';

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
});
