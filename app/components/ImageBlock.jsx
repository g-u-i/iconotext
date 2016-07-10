import React from 'react';

import styles from './ImageBlock.css';

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
      <div className={ `ic-block-round ${ styles.imageBlock }` }>
        <img
          className={ styles.imageBlock_img }
          src={ img.path }
        />
        <button
          onClick={ this.onClickDelete }
          className={ `ic-custom-button ${ styles.imageBlock_delete }` }
        >
          <img src="../assets/icons/ico-remove-1.svg" />
        </button>
      </div>
    );
  },
});
