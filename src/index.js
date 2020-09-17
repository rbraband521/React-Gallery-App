import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App2 from './App2';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App2 />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your App2 to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
