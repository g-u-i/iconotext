import fs from 'fs';
import React from 'react';
import Webcam from 'react-webcam';
import Dropzone from 'react-dropzone';

import { t } from '../utils/translator.js';
import resizable from '../utils/mixin.resizable.js';

const MAX_SIZE = {
  width: 1500,
  height: 1500,
};

export default React.createClass({
  displayName: 'iconotexte/ImageBlockEdit',
  mixins: [resizable],

  /**
   * Lifecycle:
   * **********
   */
  getInitialState() {
    return {
      webcamActivated: false,
    };
  },

  /**
   * Helpers:
   * ********
   */
  limitImgSize(base64, cb) {
    const image = new Image();
    image.onload = () => {
      const r = Math.min(
        MAX_SIZE.width / image.width,
        MAX_SIZE.height / image.height
      );

      if (r >= 1) {
        cb(base64);
      } else {
        const c = document.createElement('canvas');
        c.width = image.width * r;
        c.height = image.height * r;

        const ctx = c.getContext('2d');
        ctx.drawImage(image, 0, 0, c.width, c.height);
        cb(c.toDataURL());
      }
    };
    image.src = base64;
  },

  /**
   * Handlers:
   * *********
   */
  onOpenWebcam() {
    this.setState({
      webcamActivated: true,
    });
  },
  onSnapshot() {
    const img = this.refs.webcam.getScreenshot();

    this.limitImgSize(
      img,
      finalImg => {
        this.props.setImg({
          name: 'Webcam screenshot',
          type: 'image/webp',
          base64: finalImg,
        });
      }
    );
  },
  onDrop(files) {
    const file = files[0];

    if (!file) throw new Error('No file has been uploaded');

    fs.readFile(
      file.path,
      (err, data) => {
        if (err) throw new Error(err);

        const base64 = new Buffer(data, 'binary').toString('base64');

        this.limitImgSize(
          `data:${ file.type };base64,${ base64 }`,
          finalImg => {
            this.props.setImg({
              name: file.name,
              type: file.type,
              base64: finalImg,
            });
          }
        );
      }
    );
  },

  /**
   * Rendering:
   * **********
   */
  renderForm() {
    return (
      <div className="form">
        <div
          className="webcam"
          onClick={ this.onOpenWebcam }
        >
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
  renderWebcam() {
    return (
      <div className="capture">
        <Webcam
          ref="webcam"
          audio={ false }
          width={ this.state.width }
          height="auto"
        />
        <button onClick={ this.onSnapshot }>
          <img src="../assets/icons/ico-capture-1.svg" />
        </button>
      </div>
    );
  },
  render() {
    return (
      <div data-component="image-block-edit">{
        this.state.webcamActivated ?
          this.renderWebcam() :
          this.renderForm()
      }</div>
    );
  },
});
