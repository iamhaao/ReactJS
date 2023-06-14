import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';

// import Menu from './menuCompoment';

const myElement = <h1>I Love Iamhaao!</h1>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
// const root2 = ReactDOM.createRoot(document.getElementById('root1'));
// root2.render(
//   myElement
// );
reportWebVitals();
