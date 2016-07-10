import state from './state.js';

export default {
  updateSection({ index, updates }) {
    const section = state.select('sections', index);
    if (!section) throw new Error(`Section ${ index } does not exist.`);

    if ('img' in updates) section.set('img', updates.img);
    if ('text' in updates) section.set('text', updates.text);
  },

  deleteSection({ index }) {
    const sections = state.get('sections').slice(0);
    sections.splice(index, 1);

    state.set('sections', sections);
  },

  insertSection({ index, text = '', img = null }) {
    const sections = state.get('sections').slice(0);
    sections.splice(index + 1, 0, { text, img });

    state.set('sections', sections);
  },
};
