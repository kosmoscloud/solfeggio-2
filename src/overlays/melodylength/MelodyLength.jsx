import React, { useContext, useState } from 'react';
import { GlobalSettingsContext } from '../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../managers/OverlaysManager';
import Button from '../../components/button/Button';
import Slider from '../../components/slider/Slider';
import Select from "../../components/select/Select"
import './style.css';

function MelodyLength() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { melodyLength, setMelodyLength } = useContext(GlobalSettingsContext);
    const [ tempMelodyLength, setTempMelodyLength ] = useState(melodyLength);
    const { melodyType, setMelodyType } = useContext(GlobalSettingsContext);
    const [ tempMelodyType, setTempMelodyType ] = useState(melodyType);

    const acceptChanges = () => {
        setMelodyLength(tempMelodyLength);
        setMelodyType(tempMelodyType);
        hideOverlay();
    };

    return (
        <div className="melodylength">
            <div className="typeandslidercontainer">
                <div className="selectcontainer">
                    <Select value={tempMelodyType} label="Rodzaj melodii" onChange={e => setTempMelodyType(e.target.value)}>
                        <option value="ascending">rosnąca</option>
                        <option value="descending">opadająca</option>
                        <option value="random">swobodna</option>
                    </Select>
                </div>
                <div className="slidercontainer">
                    <Slider initialValue={tempMelodyLength} onChange={setTempMelodyLength} min={3} max={10} text="Długość melodii"/>
                </div>
            </div>
            <div className="melodylengthacceptcancel">
                <Button label="OK" onClick={acceptChanges}/>
                <Button label="Anuluj" onClick={hideOverlay}/>
            </div>
        </div>  
    );
}

export default MelodyLength;
