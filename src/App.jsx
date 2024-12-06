import './App.css';
import MenuBar from './components/menubar/MenuBar.jsx';
import ControlPanel from './components/controlpanel/ControlPanel.jsx';
import Keyboard from './components/keyboard/Keyboard.jsx';
import About from './components/overlays/about/About.jsx';

function App() {
  return (
    <div className="solfeggio2">
      <MenuBar />
      <ControlPanel />
      <Keyboard />
      <About />
    </div>
  );
}

export default App;
