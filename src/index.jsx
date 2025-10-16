import ReactDOM from 'react-dom/client';
import Solfeggio2 from './Solfeggio2';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const bodyStyle = {
  margin: 0,
  fontFamily: "'Press Start 2P', cursive",
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
};

Object.assign(document.body.style, bodyStyle);

root.render(
  <Solfeggio2 />
);

reportWebVitals(); // pass some log function to log the metrics
