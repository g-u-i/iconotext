import React from 'react';
import { render } from 'react-dom';

import state from './state.js';
import actions from './actions.js';

import App from './views/App.jsx';

import './global/app.css';
import './global/draft-v0.7.0.css';

// Initial rendering:
render(
  <App tree={ state } />,
  document.getElementById('root')
);

const app = {
  state,
  actions,
};

// (@jacomyal) TODO:
// I did not manage to use the "library" key in the dev Webpack config to expose
// the core elements of the app, so here is this little dirty hack...
if (process.env.NODE_ENV === 'development') {
  window.app = app;
}

export default app;
