import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Query from './query'
import Image from './image'
import Help from './help'

ReactDOM.render(
  <div>
    <h1 class="center border"> WELCOME TO THE MEME GENERATOR 3000 </h1>
    <Help />
    <Query />
    <Image />
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
