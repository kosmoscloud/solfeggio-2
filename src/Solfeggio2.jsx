import './style.css';
import MenuBar from './components/menubar/MenuBar.jsx';
import ExercisesManager from './managers/ExercisesManager.jsx';
import OverlaysManager from './managers/OverlaysManager.jsx';
import GlobalSettingsManager from './managers/GlobalSettingsManager.jsx';

function Solfeggio2() {
  return (
    <div className="solfeggio2">
      <GlobalSettingsManager>
        <OverlaysManager>
          <ExercisesManager>
              <MenuBar isOpen={true} />
          </ExercisesManager>
        </OverlaysManager>
      </GlobalSettingsManager>
    </div>
  );
}

export default Solfeggio2;
