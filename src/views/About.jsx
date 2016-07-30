import React from 'react';
import { branch as branchMixin } from 'baobab-react/mixins';

import { t } from '../utils/translator.js';

export default React.createClass({
  displayName: 'iconotexte/About',
  mixins: [branchMixin],

  /**
   * Rendering:
   * **********
   */
  render() {
    return (
      <div data-view="about">
        <div
          className="credits"
          dangerouslySetInnerHTML={{
            __html: t('pages.credits'),
          }}
        />
      </div>
    );
  },
});
