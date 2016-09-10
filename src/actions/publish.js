import fs from 'fs';

import state from '../state.js';
import { t } from '../utils/translator.js';

const remote = require('electron').remote; // eslint-disable-line

export default {
  updateOptions({ option, value }) {
    state.set(['publish', option], value);
  },

  pdf() {
    const dialog = remote.dialog;
    const webContents = remote.getCurrentWebContents();

    state.set(['ui', 'exportingRange'], { from: 0, to: 2 });

    // Wait for the export view to be rendered:
    setTimeout(
      () => webContents.printToPDF(
        {
          printBackground: true,
        },
        (error, data) => {
          if (error) throw error;

          dialog.showSaveDialog(
            {
              filters: [
                {
                  name: t('Publish.pdf'),
                  extensions: ['pdf'],
                },
              ],
            },
            fileName => {
              state.set(['ui', 'exportingRange'], null);

              if (fileName === undefined) return;

              fs.writeFile(
                fileName,
                data,
                err => {
                  if (err) {
                    dialog.showErrorBox(
                      t('nav.saveFail'),
                      err.message
                    );
                  } else {
                    dialog.showMessageBox({
                      message: t('nav.saveSuccess'),
                      buttons: ['OK'],
                    });
                  }
                }
              );
            }
          );
        }
      ),
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
