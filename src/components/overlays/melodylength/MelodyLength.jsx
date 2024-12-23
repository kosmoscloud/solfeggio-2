import React, { useContext, useState } from 'react';
import Button from '../buttons/button/Button';
import Slider from '../../controlpanel/rightpanel/slider/Slider';
import { GlobalSettingsContext } from '../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../managers/OverlaysManager';
import './style.css';

const MelodyLengthContext = React.createContext();

function MelodyLength() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { melodyLength, setMelodyLength } = useContext(GlobalSettingsContext);
    const [ tempMelodyLength, setTempMelodyLength ] = useState(melodyLength);

    const acceptChanges = () => {
        setMelodyLength(tempMelodyLength);
        hideOverlay();
    };

    return (
        <MelodyLengthContext.Provider value={setTempMelodyLength}>
            <div className="melodylength">
                <div className="slidercontainer">
                    <Slider initialValue={() => tempMelodyLength} context={MelodyLengthContext} onChange={setTempMelodyLength} min={3} max={10} text="Długość melodii"/>
                </div>
                <div className="acceptcancelplay" style={{flex: 1}}>
                    <Button label="OK" onClick={acceptChanges}/>
                    <Button label="Anuluj" onClick={hideOverlay}/>
                </div>
            </div>
        </MelodyLengthContext.Provider>
    );

}

export default MelodyLength;
