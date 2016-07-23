import fs from 'fs';

import state from '../state.js';
import { t } from '../utils/translator.js';

const remote = require('electron').remote; // eslint-disable-line

export default {
  updateOptions({ option, value }) {
    state.set(['publish', option], value);
  },

  exportPdf() {
    const dialog = remote.dialog;
    const webContents = remote.getCurrentWebContents();

    state.set(['ui', 'exporting'], true);

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
              state.set(['ui', 'exporting'], false);

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
  exportLulu() {
    // TODO
  },
};
