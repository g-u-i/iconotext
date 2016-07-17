import state from '../state.js';

export default {
  update(meta) {
    state.set(['document', 'meta'], meta);
  },
};
