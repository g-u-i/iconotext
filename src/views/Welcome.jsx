import React from 'react';
import { branch as branchMixin } from 'baobab-react/mixins';

import { t } from '../utils/translator.js';

export default React.createClass({
  displayName: 'iconotexte/Welcome',
  mixins: [branchMixin],

  /**
   * Handlers:
   * *********
   */
  handleClose() {
    this.props.actions.nav.setView('editor');
  },

  /**
   * Rendering:
   * **********
   */
  render() {
    return (
      <div data-view="welcome">
        <div
          className="content-box"
          onClick={ this.handleClose }
        >
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: t('Welcome.content'),
            }}
          />
          <button className="close-button" />
        </div>
      </div>
    );
  },
});
