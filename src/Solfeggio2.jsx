import './style.css';
import MenuBar from './components/menubar/MenuBar.jsx';
import ExercisesManager from './managers/ExercisesManager.jsx';
import OverlaysManager from './managers/OverlaysManager.jsx';

function Solfeggio2() {
  return (
    <div className="solfeggio2">
      <OverlaysManager>
        <ExercisesManager>
            <MenuBar isOpen={true} />
        </ExercisesManager>
      </OverlaysManager>
    </div>
  );
}

export default Solfeggio2;
