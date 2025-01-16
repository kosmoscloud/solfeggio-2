import IOLayer from './managers/IOLayer.jsx';
import GlobalSettingsLayer from './managers/GlobalSettingsLayer.jsx';
import ExerciseLayer from './managers/ExerciseLayer.jsx';
import UILayer from './managers/UILayer.jsx';

import './style.css';

function Solfeggio2() {
  return (
    <div className="solfeggio2">
      <IOLayer>
        <GlobalSettingsLayer>
          <ExerciseLayer>
            <UILayer/>
          </ExerciseLayer>
        </GlobalSettingsLayer>
      </IOLayer>
    </div>
  );
}

export default Solfeggio2;
