import React from 'react';
import { root as rootMixin } from 'baobab-react/mixins';

import Layout from '../views/Layout.jsx';
import actions from '../actions.js';

export default React.createClass({
  displayName: 'iconotexte/App',
  mixins: [rootMixin],

  render() {
    return (
      <Layout actions={ actions } />
    );
  },
});
