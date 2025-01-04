import './style.css';
import IOManager from './managers/IOManager.jsx';
import GlobalSettingsManager from './managers/GlobalSettingsManager.jsx';
import OverlaysManager from './managers/OverlaysManager.jsx';
import ExercisesManager from './managers/ExercisesManager.jsx';

import MenuBar from './components/menubar/MenuBar.jsx';

function Solfeggio2() {
  return (
    <div className="solfeggio2">
      <IOManager>
        <GlobalSettingsManager>
          <OverlaysManager>
            <ExercisesManager>
              <MenuBar />
            </ExercisesManager>
          </OverlaysManager>
        </GlobalSettingsManager>
      </IOManager>
    </div>
  );
}

export default Solfeggio2;
