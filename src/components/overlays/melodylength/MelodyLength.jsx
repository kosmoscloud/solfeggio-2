import React, { useContext, useState } from 'react';
import Button from '../../button/Button';
import Slider from '../../slider/Slider';
import { GlobalSettingsContext } from '../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../managers/OverlaysManager';
import './style.css';

function MelodyLength() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { melodyLength, setMelodyLength } = useContext(GlobalSettingsContext);
    const [tempMelodyLength, setTempMelodyLength] = useState(melodyLength);

    const acceptChanges = () => {
        setMelodyLength(tempMelodyLength);
        hideOverlay();
    };

    return (
        <div className="melodylength">
            <div className="slidercontainer">
                <Slider initialValue={tempMelodyLength} onChange={setTempMelodyLength} min={3} max={10} text="Długość melodii"/>
            </div>
            <div className="melodylengthacceptcancel">
                <Button label="OK" onClick={acceptChanges}/>
                <Button label="Anuluj" onClick={hideOverlay}/>
            </div>
        </div>  
    );
}

export default MelodyLength;
