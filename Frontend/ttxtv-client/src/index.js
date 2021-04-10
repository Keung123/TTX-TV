/**
 * @file Entrance of the react app, import libs and render the root component.
 */

// import libs
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase/app";
// import pages
import App from './pages/app/App';
// import CSS files
import './res/styles/index.css';
import './res/styles/bootstrap.min.css';
// import utils
import reportWebVitals from './utils/reportWebVitals';

// Render the root component
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Measure the performance, print to log.
reportWebVitals(console.log)