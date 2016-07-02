import React from 'react';

import styles from './Editor.Section.css';

export default React.createClass({
  displayName: 'iconotexte/Editor.Section',

  /**
   * Rendering:
   * **********
   */
  render() {
    const { text, img } = this.props;

    return (
      <div className={ styles.editorSection }>
      </div>
    );
  },
})
