import React, { useContext, useState } from 'react';
import { GlobalSettingsContext } from '../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../managers/OverlaysManager';
import Button from '../../../components/button/Button';
import Checkbox from '../../../components/checkbox/Checkbox';
import './style.css';

function Random() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledRandomChords, setTempEnabledRandomChords ] = useState(enabledChords['random']);

    const acceptChanges = () => {
        if (tempEnabledRandomChords === enabledChords['random']) {
            hideOverlay();
            return;
        }
        setEnabledChordsByType('random', tempEnabledRandomChords);
        hideOverlay();
    };

    const toggleRandom = (type) => {
        if(tempEnabledRandomChords.includes(type)) setTempEnabledRandomChords(tempEnabledRandomChords.filter(chord => chord !== type));
        else setTempEnabledRandomChords([...tempEnabledRandomChords, type]);
    }

    return (
        <div className="random">
            <div className='randomtypeselector'>
                Akordy przypadkowe:
                <Checkbox label="Dwudźwięk" isChecked={tempEnabledRandomChords.includes(2)} onClick={() => toggleRandom(2)}/>
                <Checkbox label="Trójdźwięk" isChecked={tempEnabledRandomChords.includes(3)} onClick={() => toggleRandom(3)}/>
                <Checkbox label="Czterodźwięk" isChecked={tempEnabledRandomChords.includes(4)} onClick={() => toggleRandom(4)}/>
            </div>
            <div className="randomacceptcancel">
                <Button label="OK" onClick={acceptChanges}/>
                <Button label="Anuluj" onClick={hideOverlay}/>
            </div>
        </div>
    );

}

export default Random;
