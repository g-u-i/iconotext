import React from 'react';
import { render } from 'react-dom';

import state from './state.js';
import actions from './actions.js';
import { bindToState } from './utils/translator.js';

import App from './views/App.jsx';

import '../styles/app.less';

// Plug translator to state:
bindToState(state);

// Initial rendering:
render(
  <App tree={ state } />,
  document.getElementById('root')
);

const app = {
  state,
  actions,
};

// The default behaviour of Electron when dropping an image (or other files,
// actually) is to "redirect" the whole window to the image.
// The following code prevents this default behaviour, and preserves drag and
// dropping in other features of the application:
document.addEventListener('dragover', event => {
  event.preventDefault();
  return false;
}, false);
document.addEventListener('drop', event => {
  event.preventDefault();
  return false;
}, false);

// (@jacomyal) TODO:
// I did not manage to use the "library" key in the dev Webpack config to expose
// the core elements of the app, so here is this little dirty hack...
if (process.env.NODE_ENV === 'development') {
  window.app = app;
}

export default app;
