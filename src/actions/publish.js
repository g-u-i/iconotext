import fs from 'fs';
import async from 'async';

import state from '../state.js';
import { t } from '../utils/translator.js';

const remote = require('electron').remote; // eslint-disable-line
const dialog = remote.dialog;
const webContents = remote.getCurrentWebContents();

export default {
  updateOptions({ option, value }) {
    state.set(['publish', option], value);
  },

  pdf() {
    const BATCH_SIZE = 1;
    const files = [];
    let basePath = '';

    async.waterfall([
      // Ask the user where to save the file:
      cb => dialog.showSaveDialog(
        {
          filters: [
            {
              name: t('Publish.pdf'),
              extensions: ['pdf'],
            },
          ],
        },
        fileName => {
          if (fileName === undefined) {
            cb('cancelled');
          }

          basePath = fileName;
          cb(null);
        }
      ),

      // Create tmp directory:
      cb => fs.mkdir(
        basePath,
        err => cb(err)
      ),

      // Export splitted PDF files:
      cb => async.whilst(
        () => (
          (state.get('ui', 'exportingRange', 'to') || 0)
          < state.get('publish', 'pages').length
        ),
        wcb => {
          const start = state.get('ui', 'exportingRange', 'to') || 0;
          const end = start + BATCH_SIZE + 1;
          const path = basePath + '/' + start + '-' + end + '.pdf';
          files.push(path);

          state.set(
            ['ui', 'exportingRange'],
            { from: start, to: end }
          );
          state.commit();

          setTimeout(
            () => webContents.printToPDF(
              {
                printBackground: true,
              },
              (err, data) => {
                if (err) {
                  wcb(err);
                } else {
                  fs.writeFile(
                    path,
                    data,
                    wcb
                  );
                }
              }
            ),
            0
          );
        },
        cb
      ),
    ], () => {
      // TODO
    });
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
