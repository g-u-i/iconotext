import React from 'react';
import { render } from 'react-dom';

import state from './state';
import App from './views/App';

import './app.global.css';

render(
  <App tree={ state } />,
  document.getElementById('root')
);
