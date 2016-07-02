import state from './state.js';

export default {
  updateSections(sections) {
    state.set('sections', sections);
  },
};
