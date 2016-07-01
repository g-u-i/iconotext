import React from 'react';
import { root as rootMixin } from 'baobab-react/mixins';

export default React.createClass({
  displayName: 'iconotexte/App',
  mixins: [rootMixin],
  render() {
    return (
      <div>Hello World!</div>
    );
  },
});
