import state from '../state.js';

export default {
  update(meta) {
    state.set(['ui', 'unsave'], true);
    state.set(['document', 'meta'], meta);
  },
};
