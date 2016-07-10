import React from 'react';
import Dropzone from 'react-dropzone';

import styles from './ImageBlockEdit.css';
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
      <div
        className={
          `ic-block-round ic-block-dashed ${ styles.imageBlockEdit }`
        }
      >
        <div className={ styles.imageBlockEdit_webcam }>
          <button
            className={
              `ic-custom-button ${ styles.imageBlockEdit_webcam_icon }`
            }
          >
            <img src="../assets/icons/ico-edit-img-4.svg" />
          </button>
          <div className={ styles.imageBlockEdit_webcam_text }>{
            t('ImageBlockEdit.webcamText')
          }</div>
        </div>

        <div className={ styles.imageBlockEdit_image }>
          <Dropzone
            accept="image/*"
            className={ styles.imageBlockEdit_dropzone }
            multiple={ false }
            onDrop={ this.onDrop }
          >
            <button
              className={
                `ic-custom-button ${ styles.imageBlockEdit_webcam_icon }`
              }
            >
              <img src="../assets/icons/ico-save-1.svg" />
            </button>
            <div className={ styles.imageBlockEdit_webcam_text }>{
              t('ImageBlockEdit.imageText')
            }</div>
          </Dropzone>
        </div>
      </div>
    );
  },
});
