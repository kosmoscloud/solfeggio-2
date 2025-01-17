import IOLayer from './managers/IOLayer.jsx';
import GlobalSettingsLayer from './managers/GlobalSettingsLayer.jsx';
import ExerciseLayer from './managers/ExerciseLayer.jsx';
import UILayer from './managers/UILayer.jsx';

import './style.css';

function Solfeggio2() {
  return (
    <div className="solfeggio2">
      <GlobalSettingsLayer>
        <IOLayer>
          <ExerciseLayer>
            <UILayer/>
          </ExerciseLayer>
        </IOLayer>
      </GlobalSettingsLayer>
    </div>
  );
}

export default Solfeggio2;
