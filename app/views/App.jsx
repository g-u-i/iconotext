import React from 'react';
import { root as rootMixin } from 'baobab-react/mixins';

import Editor from '../components/Editor.jsx';
import actions from '../actions.js';

export default React.createClass({
  displayName: 'iconotexte/App',
  mixins: [rootMixin],

  render() {
    return (
      <div>
        <Editor
          actions={ actions }
        />
      </div>
    );
  },
});
