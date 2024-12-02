import './App.css';
import MenuBar from './components/menubar/MenuBar.jsx';
import ControlPanel from './components/controlpanel/ControlPanel.jsx';
import Keyboard from './components/keyboard/Keyboard.jsx';

function App() {
  return (
    <div className="solfeggio2">
      <MenuBar />
      <ControlPanel />
      <Keyboard />
    </div>
  );
}

export default App;
