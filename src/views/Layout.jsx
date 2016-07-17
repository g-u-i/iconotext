import React from 'react';
import { branch as branchMixin } from 'baobab-react/mixins';

import About from './About.jsx';
import Editor from './Editor.jsx';
import Publish from './Publish.jsx';

import { t } from '../utils/translator.js';

const VIEWS = {
  about: About,
  editor: Editor,
  publish: Publish,
};

const MENU = [
  { id: 'about', type: 'view', position: 'left' },
  { id: 'editor', type: 'view', position: 'left' },
  { id: 'publish', type: 'view', position: 'right' },
  { id: 'save', type: 'action', position: 'right' },
  { id: 'open', type: 'action', position: 'right' },
];

export default React.createClass({
  displayName: 'iconotexte/Layout',
  mixins: [branchMixin],
  cursors: {
    view: ['view'],
  },

  /**
   * Lifecycle:
   * **********
   */
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

  /**
   * Handlers:
   * *********
   */
  onClickMenu(e) {
    const target = e.currentTarget;
    const id = target.getAttribute('data-view');
    const type = target.getAttribute('data-type');

    if (type === 'view') {
      this.props.actions.nav.setView(id);
    } else if (type === 'action') {
      this.props.actions.nav[id]();
    }
  },

  /**
   * Render:
   * *******
   */
  render() {
    const { view } = this.state;
    const { actions } = this.props;
    const ReactView = VIEWS[view || 'editor'];

    return (
      <div
        data-view="layout"
        data-current-view={ view }
        data-anim={ this.state.anim || undefined }
      >
        { /* CURRENT VIEW */ }
        <div className="main">
          <div className="wrapper">
            <ReactView actions={ actions } />
          </div>
        </div>

        { /* TITLE */ }
        <div className="head">
          <div className="wrapper">
            <i className="logo left" />
            <i className="logo right" />
            <h1 className="title left">{ t('commons.titleLeft') }</h1>
            <h1 className="title right">{ t('commons.titleRight') }</h1>
          </div>
        </div>

        { /* MENU */ }
        <div className="foot">
          <ul className="menu wrapper">{
            MENU.filter(
              ({ id, type }) => type !== 'view' || id !== view
            ).map(({ id, type, position }) => (
              <li
                key={ id }
                data-view={ id }
                data-type={ type }
                className={ position }
                onClick={ this.onClickMenu }
              >
                <div className="icon" />
                <div className="label">{
                  t(`menu.${ id }`)
                }</div>
              </li>
            ))
          }</ul>
        </div>
      </div>
    );
  },
});
