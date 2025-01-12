import './style.css';
import IOManager from './managers/IOManager.jsx';
import GlobalSettingsManager from './managers/GlobalSettingsManager.jsx';
import OverlaysManager from './managers/OverlaysManager.jsx';
import ExercisesManager from './managers/ExercisesManager.jsx';
import { BrowserView, MobileView } from 'react-device-detect';
import Alert from './ui/overlays/alert/Alert.jsx';

import MenuBar from './ui/menubar/MenuBar.jsx';

function Solfeggio2() {
  return (
    <div className="solfeggio2">
      <BrowserView>
        <IOManager>
          <GlobalSettingsManager>
            <OverlaysManager>
              <ExercisesManager>
                <MenuBar />
              </ExercisesManager>
            </OverlaysManager>
          </GlobalSettingsManager>
        </IOManager>
      </BrowserView>
      <MobileView>
        <OverlaysManager>
          <Alert text="Ta aplikacja nie jest dostępna na urządzeniach mobilnych." />
        </OverlaysManager>
      </MobileView>
    </div>
  );
}

export default Solfeggio2;
