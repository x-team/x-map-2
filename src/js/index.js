import React from 'react'
import ReactDOM from 'react-dom';
// tooltip react16 compatibility hack
import PropTypes from 'prop-types';
React.PropTypes = PropTypes;

import { Provider } from 'react-redux'
import { store } from "./store"
import Map from './pages/'

ReactDOM.render(
  <Provider store={store}>
    <Map />
  </Provider>,
  document.getElementById('root')
)

if (module.hot)
  module.hot.accept()
