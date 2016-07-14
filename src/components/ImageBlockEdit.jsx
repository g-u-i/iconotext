import fs from 'fs';
import React from 'react';
import Dropzone from 'react-dropzone';

import { t } from '../utils/translator.js';

export default React.createClass({
  displayName: 'iconotexte/ImageBlockEdit',

  /**
   * Handlers:
   * *********
   */
  onDrop(files) {
    const file = files[0];

    if (!file) throw new Error('No file has been uploaded');

    fs.readFile(
      file.path,
      (err, data) => {
        if (err) throw new Error(err);

        const base64 = new Buffer(data, 'binary').toString('base64');

        this.props.setImg({
          name: file.name,
          type: file.type,
          base64: `data:${ file.type };base64,${ base64 }`,
        });
      }
    );
  },

  /**
   * Rendering:
   * **********
   */
  render() {
    return (
      <div data-component="image-block-edit">
        <div className="webcam">
          <button>
            <img src="../assets/icons/ico-edit-img-4.svg" />
          </button>
          <div>{
            t('ImageBlockEdit.webcamText')
          }</div>
        </div>

        <div className="file">
          <Dropzone
            accept="image/*"
            className="dropzone"
            multiple={ false }
            onDrop={ this.onDrop }
          >
            <button>
              <img src="../assets/icons/ico-save-1.svg" />
            </button>
            <div>{
              t('ImageBlockEdit.imageText')
            }</div>
          </Dropzone>
        </div>
      </div>
    );
  },
});
