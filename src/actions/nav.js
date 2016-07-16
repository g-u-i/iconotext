import state from '../state.js';

export default {
  setView(view) {
    state.set('view', view);
  },
};
