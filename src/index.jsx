import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Solfeggio2 from './Solfeggio2';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Solfeggio2 />
  </React.StrictMode>
);

reportWebVitals(); // pass some log function to log the metrics
