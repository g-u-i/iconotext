import state from '../state.js';

export default {
  updateOptions({ option, value }) {
    state.set(['publish', option], value);
  },
};
