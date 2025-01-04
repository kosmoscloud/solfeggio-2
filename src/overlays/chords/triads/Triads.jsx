import React, { useContext, useState } from 'react';
import { GlobalSettingsContext } from '../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../managers/OverlaysManager';
import Button from '../../../components/button/Button';
import Checkbox from '../../../components/checkbox/Checkbox';
import './style.css';

function Triads() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledInversionsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledTriads, setTempEnabledTriads ] = useState(enabledChords['triads']);
    const [ tempEnabledTriadsInversions, setTempEnabledTriadsInversions ] = useState(enabledInversions['triads']);

    const acceptChanges = () => {
        if (tempEnabledTriads === enabledChords['triads'] && tempEnabledTriadsInversions === enabledInversions['triads']) {
            hideOverlay();
            return;
        }
        setEnabledChordsByType('triads', tempEnabledTriads);
        setEnabledInversionsByType('triads', tempEnabledTriadsInversions);
        hideOverlay();
    };

    const toggleTriad = (type) => {
        if(tempEnabledTriads.includes(type)) setTempEnabledTriads(tempEnabledTriads.filter(chord => chord !== type));
        else setTempEnabledTriads([...tempEnabledTriads, type]);
    }

    const toggleTriadsInversion = (inversion) => {
        if(tempEnabledTriadsInversions.includes(inversion)) setTempEnabledTriadsInversions(tempEnabledTriadsInversions.filter(inv => inv !== inversion));
        else setTempEnabledTriadsInversions([...tempEnabledTriadsInversions, inversion]);
    }

    return (
        <div className="triads">
            <div className='triadtypeselector'>
                Trójdźwięki:
                <Checkbox label="Durowy" isChecked={tempEnabledTriads.includes('maj')} onClick={() => toggleTriad('maj')}/>
                <Checkbox label="Molowy" isChecked={tempEnabledTriads.includes('min')} onClick={() => toggleTriad('min')}/>
                <Checkbox label="Zmniejszony" isChecked={tempEnabledTriads.includes('dim')} onClick={() => toggleTriad('dim')}/>
                <Checkbox label="Zwiększony" isChecked={tempEnabledTriads.includes('aug')} onClick={() => toggleTriad('aug')}/>
            </div>
            <div className='triadinversionselector'>
                Przewroty:
                <Checkbox label="Postać zas." isChecked={tempEnabledTriadsInversions.includes(0)} onClick={() => toggleTriadsInversion(0)}/>
                <Checkbox label="I przewrót" isChecked={tempEnabledTriadsInversions.includes(1)} onClick={() => toggleTriadsInversion(1)}/>
                <Checkbox label="II przewrót" isChecked={tempEnabledTriadsInversions.includes(2)} onClick={() => toggleTriadsInversion(2)}/>
            </div>
            <div className="triadsacceptcancel">
                <Button label="OK" onClick={acceptChanges}/>
                <Button label="Anuluj" onClick={hideOverlay}/>
            </div>
        </div>
    );

}

export default Triads;
