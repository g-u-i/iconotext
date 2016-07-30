import React from 'react';
import { shell } from 'electron'; // eslint-disable-line
import { root as rootMixin } from 'baobab-react/mixins';

import Layout from '../views/Layout.jsx';
import actions from '../actions.js';

export default React.createClass({
  displayName: 'iconotexte/App',
  mixins: [rootMixin],

  componentDidMount() {
    // Override default A tags behaviour:
    document.body.addEventListener('click', this.handleClickATag);
  },
  componentWillUnmount() {
    // Override default A tags behaviour:
    document.body.removeEventListener('click', this.handleClickATag);
  },

  handleClickATag(e) {
    const target = e.target;

    if (target.tagName !== 'A' || !target.getAttribute('href')) return;

    e.preventDefault();
    e.stopPropagation();

    const url = target.getAttribute('href');
    shell.openExternal(url);
  },

  render() {
    return (
      <Layout actions={ actions } />
    );
  },
});
