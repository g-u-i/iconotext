import Baobab from 'baobab';

export default new Baobab({
  // Interface language:
  locale: 'fr-FR',

  // Sections format:
  // { text: '?MarkdownString', img: '?Image' }
  sections: [],

  // The "ui" branch only contains data related to UI manipulations, and are
  // not data to save:
  ui: {
    // The index of the section with the image import panel opened:
    sectionEditingImage: null,
  },
});
