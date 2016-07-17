import React from 'react';
import { branch as branchMixin } from 'baobab-react/mixins';

import PDFRendering from '../components/PDFRendering.jsx';

export default React.createClass({
  displayName: 'iconotexte/Exporting',
  mixins: [branchMixin],
  cursors: {
    publish: ['publish'],
    meta: ['document', 'meta'],
    sections: ['document', 'sections'],
  },

  /**
   * Rendering:
   * **********
   */
  render() {
    const { publish, meta, sections } = this.state;

    return (
      <div data-view="export">
        <PDFRendering
          cover={ meta }
          pages={ sections }
          options={ publish }
        />
      </div>
    );
  },
});
