import React from 'react';
import { branch as branchMixin } from 'baobab-react/mixins';

import Editor from './Editor.jsx';

import { t } from '../utils/translator.js';

const VIEWS = {
  editor: Editor,
};

export default React.createClass({
  displayName: 'iconotexte/Layout',
  mixins: [branchMixin],
  cursors: {
    view: ['view'],
  },

  getInitialState() {
    return {
      anim: false,
    };
  },
  componentDidMount() {
    setTimeout(
      () => this.setState({ anim: true }),
      100
    );
  },

  render() {
    const { view } = this.state;
    const { actions } = this.props;
    const ReactView = VIEWS[view || 'editor'];

    return (
      <div
        data-view="layout"
        data-anim={ this.state.anim || undefined }
      >
        { /* TITLE */ }
        <div className="head">
          <i className="logo left" />
          <i className="logo right" />
          <h1 className="title left">{ t('commons.titleLeft') }</h1>
          <h1 className="title right">{ t('commons.titleRight') }</h1>
        </div>

        { /* CURRENT VIEW */ }
        <div className="main">
          <div className="wrapper">
            <ReactView actions={ actions } />
          </div>
        </div>

        { /* MENU */ }
        <div className="foot">
          { /* TODO */ }
        </div>
      </div>
    );
  },
});
