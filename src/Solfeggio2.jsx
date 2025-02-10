import IOLayer from './layers/IOLayer.jsx';
import GlobalSettingsLayer from './layers/GlobalSettingsLayer.jsx';
import ExerciseLayer from './layers/ExerciseLayer.jsx';
import UILayer from './layers/UILayer.jsx';

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
