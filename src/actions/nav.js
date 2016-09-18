import fs from 'fs';
import path from 'path';

import state from '../state.js';
import { t } from '../utils/translator.js';

const { dialog } = require('electron').remote; // eslint-disable-line

export default {
  setView(view) {
    state.set('view', view);
    this.closeWelcomeMessage();
  },
  closeWelcomeMessage() {
    state.set(['ui', 'welcome'], false);
  },
  save() {
    dialog.showSaveDialog(
      {
        defaultPath: state.get('ui', 'basename') || undefined,
        filters: [
          {
            name: t('nav.fileExtName'),
            extensions: ['iconotext'],
          },
        ],
      },
      fileName => {
        if (fileName === undefined) return;

        state.set(['ui', 'basename'], path.basename(fileName));

        fs.writeFile(
          fileName,
          JSON.stringify(state.get('document')),
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

              state.set(['ui', 'unsave'], false);
            }
          }
        );
      }
    );
  },
  open() {
    dialog.showOpenDialog(
      {
        filters: [
          {
            name: t('nav.fileExtName'),
            extensions: ['iconotext'],
          },
        ],
      },
      fileNames => {
        if (fileNames === undefined) return;
        const fileName = fileNames[0];
        const basename = path.basename(fileName);

        state.set(['ui', 'basename'], basename);
        state.set(['ui', 'loading'], basename);
        state.commit();

        fs.readFile(
          fileName,
          'utf-8',
          (err, data) => {
            if (err) {
              state.set(['ui', 'loading'], null);
              dialog.showErrorBox(
                t('nav.loadFail'),
                err.message
              );
            } else {
              let doc;

              try {
                doc = JSON.parse(data);
              } catch (e) {
                dialog.showErrorBox(
                  t('nav.parseFail'),
                  e.message
                );
              }

              state.set(['ui', 'loading'], null);

              if (doc) {
                state.set('document', doc);
                state.set(['ui', 'unsave'], false);
              }
            }
          }
        );
      }
    );
  },
};
