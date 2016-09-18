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

  print() {
    state.set(
      ['ui', 'exportingRange'],
      { from: 0, to: state.get('publish', 'pages').length }
    );
    state.set(['ui', 'exportingMethod'], 'print');
    state.commit();

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

        state.set(['ui', 'exportingRange'], null);
        state.set(['ui', 'exportingMethod'], null);
        state.commit();
      },
      0
    );
  },

  pdf() {
    const BATCH_SIZE = 10;
    const files = [];
    let basePath = '';

    async.waterfall([
      // Ask the user where to save the file:
      cb => dialog.showSaveDialog(
        {
          filters: [
            {
              name: t('Publish.directory'),
              extensions: ['*'],
            },
          ],
        },
        fileName => {
          if (fileName === undefined) {
            cb('cancelled');
          } else {
            basePath = fileName;
            cb(null);
          }
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
          const end =
            Math.min(start + BATCH_SIZE, state.get('publish', 'pages').length);
          const path = basePath + '/pages-' + (start + 1) + '-' + end + '.pdf';
          files.push(path);

          state.set(
            ['ui', 'exportingRange'],
            { from: start, to: end }
          );
          state.set(['ui', 'exportingMethod'], 'pdf');
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
      state.set(['ui', 'exportingRange'], null);
      state.set(['ui', 'exportingMethod'], null);
      state.commit();
    });
  },
};
