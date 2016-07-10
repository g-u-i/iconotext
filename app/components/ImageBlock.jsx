import React from 'react';

import styles from './ImageBlock.css';

export default React.createClass({
  displayName: 'iconotexte/ImageBlock',

  /**
   * Handlers:
   * *********
   */
  onChange(/* newState */) {
    // TODO:
    // Tell parent about the new text content
  },

  /**
   * Rendering:
   * **********
   */
  render() {
    // const { img } = this.props;

    return (
      <div className={ `block ${ styles.imageBlock }` }>
        { /* TODO */ }
      </div>
    );
  },
});
