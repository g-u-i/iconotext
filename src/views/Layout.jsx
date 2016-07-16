import React from 'react';
import { branch as branchMixin } from 'baobab-react/mixins';

import About from './About.jsx';
import Editor from './Editor.jsx';

import { t } from '../utils/translator.js';

const VIEWS = {
  about: About,
  editor: Editor,
};
const MENU = [
  { id: 'about', type: 'view', position: 'left' },
  { id: 'publish', type: 'action', position: 'right' },
  { id: 'save', type: 'action', position: 'right' },
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
    const id = target.getAttribute('data-menu-id');
    const type = target.getAttribute('data-menu-type');

    if (type === 'view') {
      this.props.actions.nav.setView(id);
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
          <ul className="menu">{
            MENU.map(({ id, type, position }) => (
              <li
                key={ id }
                data-menu-id={ id }
                data-menu-type={ type }
                onClick={ this.onClickMenu }
                className={ position }
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
