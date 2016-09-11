import React from 'react';
import { t } from '../utils/translator.js';

export default React.createClass({
  displayName: 'iconotexte/ImageBlock',

  onClickDelete() {
    this.props.onDelete();
  },

  /**
   * Rendering:
   * **********
   */
  render() {
    const { img } = this.props;

    return (
      <div data-component="image-block">
        <img src={ img.base64 } />

        <button
          onClick={ this.onClickDelete }
          data-tooltip={ t('buttons.deleteImage') }
        >
          <img src="../assets/icons/ico-remove-1.svg" />
        </button>
      </div>
    );
  },
});
