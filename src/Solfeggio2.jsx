import IOLayer from './layers/IOLayer.jsx';
import GlobalSettingsLayer from './layers/GlobalSettingsLayer.jsx';
import ExerciseLayer from './layers/ExerciseLayer.jsx';
import UILayer from './layers/UILayer.jsx';
import { MIDIProvider } from '@react-midi/hooks';

function Solfeggio2() {

  return (
    <MIDIProvider>
      <div className="solfeggio2">
        <GlobalSettingsLayer>
          <IOLayer>
            <ExerciseLayer>
              <UILayer/>
            </ExerciseLayer>
          </IOLayer>
        </GlobalSettingsLayer>
      </div>
    </MIDIProvider>
  );
}

export default Solfeggio2;
