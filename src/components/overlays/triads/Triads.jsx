import React, { useContext, useEffect, useState } from 'react';
import Button from '../buttons/button/Button';
import { GlobalSettingsContext } from '../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../managers/OverlaysManager';
import './style.css';
import Checkbox from '../checkbox/Checkbox';

const TriadsContext = React.createContext();

function Triads() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { enabledChords, setEnabledTriads } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledTriadsInversions } = useContext(GlobalSettingsContext);
    const [ tempEnabledTriads, setTempEnabledTriads ] = useState(enabledChords['triads']);
    const [ tempEnabledTriadsInversions, setTempEnabledTriadsInversions ] = useState(enabledInversions['triads']);

    const acceptChanges = () => {
        setEnabledTriads(tempEnabledTriads);
        setEnabledTriadsInversions(tempEnabledTriadsInversions);
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

    useEffect(() => {
        console.log(tempEnabledTriads)
    }, [tempEnabledTriads]);

    useEffect(() => {
        console.log(tempEnabledTriadsInversions)
    }, [tempEnabledTriadsInversions]);

    return (
        <TriadsContext.Provider value={{setEnabledTriads, setEnabledTriadsInversions}}>
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
                <div className="acceptcancel">
                    <Button label="OK" onClick={acceptChanges}/>
                    <Button label="Anuluj" onClick={hideOverlay}/>
                </div>
            </div>
        </TriadsContext.Provider>
    );

}

export default Triads;
