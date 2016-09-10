import state from '../state.js';

const remote = require('electron').remote; // eslint-disable-line

export default {
  updateOptions({ option, value }) {
    state.set(['publish', option], value);
  },

  pdf() {
    const webContents = remote.getCurrentWebContents();

    state.set(['ui', 'exporting'], true);

    // Wait for the export view to be rendered:
    setTimeout(
      () => {
        webContents.print(
          { printBackground: true }
        );

        state.set(['ui', 'exporting'], false);
      },
      0
    );
  },
  lulu() {
    // The differences between this export and the classic PDF export is dealt
    // by the CSS print sheets:
    this.pdf();
  },
  images() {
    // TODO
  },
};
