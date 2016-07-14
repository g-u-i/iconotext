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

    if (!file) return;

    this.props.setImg({
      name: files[0].name,
      path: files[0].path,
      type: files[0].type,
    });
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
