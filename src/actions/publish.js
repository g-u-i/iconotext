import state from '../state.js';

const remote = require('electron').remote; // eslint-disable-line

export default {
  updateOptions({ option, value }) {
    state.set(['publish', option], value);
  },

  pdf() {
    const webContents = remote.getCurrentWebContents();

    state.set(['ui', 'exporting'], true);

    // Determine size
    const options = { printBackground: true };
    const publish = state.get('publish');

    if (publish.format === 'a4') {
      options.landscape = publish.orientation === 'landscape';
      options.pageSize = 'A4';
    } else if (publish.format === 'pocket') {
      if (publish.orientation === 'landscape') {
        options.landscape = true;
        options.pageSize = { width: 174600, height: 107900 };
      } else {
        options.pageSize = { width: 107900, height: 174600 };
      }
    }

    // Wait for the export view to be rendered:
    setTimeout(
      () => {
        webContents.print(options);

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
