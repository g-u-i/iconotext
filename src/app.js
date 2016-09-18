import React from 'react';
import { render } from 'react-dom';

import state from './state.js';
import actions from './actions.js';
import { t, bindToState } from './utils/translator.js';

import App from './views/App.jsx';

import '../styles/app.less';

// Plug translator to state:
bindToState(state);

// If the user has not saved his file
window.onbeforeunload = e => {
  if (
    state.get('ui', 'unsave') &&
    !window.confirm(t('nav.unsavedAndQuitting')) // eslint-disable-line
  ) {
    e.returnValue = 'false';
  }
};

// Initial rendering:
render(
  <App tree={ state } />,
  document.getElementById('root')
);

const iconotext = {
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

// The following code catched

// (@jacomyal) TODO:
// I did not manage to use the "library" key in the dev Webpack config to expose
// the core elements of the app, so here is this little dirty hack...
if (process.env.NODE_ENV === 'development') {
  window.iconotext = iconotext;
}

export default iconotext;
