import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './i18n';
import './index.css';
import reportWebVitals from './reportWebVitals';

const rootNode = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>,
  rootNode,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
