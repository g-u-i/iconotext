import React from 'react';

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
        <img src={ img.path } />

        <button onClick={ this.onClickDelete } >
          <img src="../assets/icons/ico-remove-1.svg" />
        </button>
      </div>
    );
  },
});
