import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Query from './query'
import Help from './help'

ReactDOM.render(
  <div>
    <Help />
    <Query />
  </div>,
  document.getElementById('root')
);
