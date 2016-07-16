import state from '../state.js';

const randInt4 = () => Math.ceil(Math.random() * 4);

export default {
  update({ index, updates }) {
    const section = state.select('document', 'sections', index);
    if (!section) throw new Error(`Section ${ index } does not exist.`);

    if ('img' in updates) section.set('img', updates.img);
    if ('text' in updates) section.set('text', updates.text);
  },

  delete({ index }) {
    const sections = state.get('document', 'sections').slice(0);
    sections.splice(index, 1);

    state.set(['document', 'sections'], sections);
  },

  insert({
    index,
    img = null,
    text = '',
    imgIcon = randInt4(),
    textIcon = randInt4(),
  }) {
    const sections = state.get('document', 'sections').slice(0);
    sections.splice(index + 1, 0, { text, img, textIcon, imgIcon });

    state.set(['document', 'sections'], sections);
    state.set(['ui', 'sectionEditingImage'], null);
  },

  mergeAfter({ index }) {
    const sections = state.get('document', 'sections').slice(0);

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
      imgIcon: sections[index].imgIcon,
      textIcon: sections[index].textIcon,
    };

    // Delete section:
    sections.splice(index + 1, 1);

    state.set(['document', 'sections'], sections);
  },

  mergeBefore({ index }) {
    const sections = state.get('document', 'sections').slice(0);

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
      imgIcon: sections[index - 1].imgIcon,
      textIcon: sections[index - 1].textIcon,
    };

    // Delete section:
    sections.splice(index, 1);

    state.set(['document', 'sections'], sections);
  },

  editImage({ index }) {
    state.set(['ui', 'sectionEditingImage'], index);
  },
};
