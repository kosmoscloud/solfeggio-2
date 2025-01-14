import { BrowserView, MobileView } from 'react-device-detect';

import IOLayer from './managers/IOLayer.jsx';
import GlobalSettingsLayer from './managers/GlobalSettingsLayer.jsx';
import ExerciseLayer from './managers/ExerciseLayer.jsx';
import UILayer from './managers/UILayer.jsx';

import './style.css';

function Solfeggio2() {
  return (
    <div className="solfeggio2">
      <BrowserView>
        <IOLayer>
          <GlobalSettingsLayer>
            <ExerciseLayer>
              <UILayer/>
            </ExerciseLayer>
          </GlobalSettingsLayer>
        </IOLayer>
      </BrowserView>
      <MobileView>
        {/* <Alert text="Ta aplikacja nie jest dostępna na urządzeniach mobilnych." /> */}
      </MobileView>
    </div>
  );
}

export default Solfeggio2;
