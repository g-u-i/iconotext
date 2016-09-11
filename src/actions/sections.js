import state from '../state.js';

const randInt4 = () => Math.ceil(Math.random() * 4);

export default {
  update({ index, updates }) {
    const section = state.select('document', 'sections', index);
    let changed = false;

    if (!section) throw new Error(`Section ${ index } does not exist.`);

    if ('img' in updates) {
      section.set('img', updates.img);
      changed = true;
    }

    if ('text' in updates) {
      section.set('text', updates.text);
      changed = true;
    }

    if (changed) {
      state.set(['ui', 'unsave'], true);
    }
  },

  delete({ index }) {
    const sections = state.get('document', 'sections').slice(0);
    sections.splice(index, 1);

    state.set(['document', 'sections'], sections);
    state.set(['ui', 'unsave'], true);
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
    state.set(['ui', 'unsave'], true);
  },

  mergeAfter({ index }) {
    const sections = state.get('document', 'sections').slice(0);

    if (index === sections.length - 1) {
      throw new Error(`Section ${ index + 1 } does not exist.`);
    }

    this.mergeBefore({ index: index + 1 });
  },

  mergeBefore({ index }) {
    const sections = state.get('document', 'sections').slice(0);

    if (index === 0) {
      throw new Error(`Section ${ index - 1 } does not exist.`);
    }

    // Merge texts:
    const preserveSection =
      sections[index - 1].img && sections[index].img;
    const mergedText = [
      sections[index - 1].text,
      sections[index].text,
    ].filter(s => !!s).join('\n');

    sections[index - 1] = {
      text: mergedText,
      img: sections[index - 1].img || sections[index].img,
      imgIcon: sections[index - 1].imgIcon,
      textIcon: sections[index - 1].textIcon,
    };

    // If both sections have images, keep both sections and move the text:
    if (preserveSection) {
      sections[index] = {
        text: '',
        img: sections[index].img,
        imgIcon: sections[index].imgIcon,
        textIcon: sections[index].textIcon,
      };

    // If there is zero or one image, delete the emptied section:
    } else {
      sections.splice(index, 1);
    }

    state.set(['document', 'sections'], sections);
    state.set(['ui', 'unsave'], true);
  },

  editImage({ index }) {
    state.set(['ui', 'sectionEditingImage'], index);
  },
};
