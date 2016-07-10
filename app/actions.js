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
    state.set(['ui', 'sectionEditingImage'], null);
  },

  mergeSectionAfter({ index }) {
    const sections = state.get('sections').slice(0);

    if (index === sections.length - 1) {
      throw new Error(`Section ${ index + 1 } does not exist.`);
    }

    // Create merged section:
    sections[index] = {
      img: sections[index].img || sections[index + 1].img,
      text: [
        sections[index].text,
        sections[index + 1].text,
      ].filter(s => !!s).join('\n'),
    };

    // Delete section:
    sections.splice(index + 1, 1);

    state.set('sections', sections);
  },

  mergeSectionBefore({ index }) {
    const sections = state.get('sections').slice(0);

    if (index === 0) {
      throw new Error(`Section ${ index - 1 } does not exist.`);
    }

    // Merge texts:
    sections[index - 1] = {
      img: sections[index - 1].img || sections[index].img,
      text: [
        sections[index - 1].text,
        sections[index].text,
      ].filter(s => !!s).join('\n'),
    };

    // Delete section:
    sections.splice(index, 1);

    state.set('sections', sections);
  },

  editSectionImage({ index }) {
    state.set(['ui', 'sectionEditingImage'], index);
  },
};
