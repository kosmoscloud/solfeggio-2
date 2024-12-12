import './style.css';
import MenuBar from './components/menubar/MenuBar.jsx';
import ControlPanel from './components/controlpanel/ControlPanel.jsx';
import Keyboard from './components/keyboard/Keyboard.jsx';
import About from './components/overlays/about/About.jsx';
import ExercisesManager from './managers/ExercisesManager.jsx';

function Solfeggio2() {
  return (
    <div className="solfeggio2">
      <ExercisesManager>
          <MenuBar isOpen={true} />
          <About />
      </ExercisesManager>
    </div>
  );
}

export default Solfeggio2;
