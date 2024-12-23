import React, { useContext, useEffect, useState } from 'react';
import Button from '../buttons/button/Button';
import { GlobalSettingsContext } from '../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../managers/OverlaysManager';
import Checkbox from '../checkbox/Checkbox';
import './style.css';

const NinthsContext = React.createContext();

function Ninths() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { enabledChords, setEnabledNinths } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledNinthsInversions } = useContext(GlobalSettingsContext);
    const [ tempEnabledNinths, setTempEnabledNinths ] = useState(enabledChords['ninths']);
    const [ tempEnabledNinthsInversions, setTempEnabledNinthsInversions ] = useState(enabledInversions['ninths']);

    const acceptChanges = () => {
        setEnabledNinths(tempEnabledNinths);
        setEnabledNinthsInversions(tempEnabledNinthsInversions);
        hideOverlay();
    };

    const toggleNinthChord = (type) => {
        if(tempEnabledNinths.includes(type)) setTempEnabledNinths(tempEnabledNinths.filter(chord => chord !== type));
        else setTempEnabledNinths([...tempEnabledNinths, type]);
    }

    const toggleInversion = (inversion) => {
        if(tempEnabledNinthsInversions.includes(inversion)) setTempEnabledNinthsInversions(tempEnabledNinthsInversions.filter(inv => inv !== inversion));
        else setTempEnabledNinthsInversions([...tempEnabledNinthsInversions, inversion]);
    }

    useEffect(() => {
        console.log(tempEnabledNinths)
    }, [tempEnabledNinths]);

    useEffect(() => {
        console.log(tempEnabledNinthsInversions)
    }, [tempEnabledNinthsInversions]);

    return (
        <NinthsContext.Provider value={{setEnabledNinths, setEnabledNinthsInversions}}>
            <div className="ninths">
                <div className='ninthstypeselector'>
                    Akordy z noną:
                    <div className='ninthstypeselector-columns'>
                        <div className='ninthstypeselector-column'>
                            <Checkbox label="3w, 7w, 9w" isChecked={tempEnabledNinths.includes('maj7')} onClick={() => toggleNinthChord('maj7')}/>
                            <Checkbox label="3w, 7m, 9w" isChecked={tempEnabledNinths.includes('dom7')} onClick={() => toggleNinthChord('dom7')}/>
                            <Checkbox label="3m, 7w, 9w" isChecked={tempEnabledNinths.includes('min7')} onClick={() => toggleNinthChord('min7')}/>
                            <Checkbox label="3m, 7m, 9w" isChecked={tempEnabledNinths.includes('minmaj7')} onClick={() => toggleNinthChord('minmaj7')}/>
                            <Checkbox label="3w, 7m, 9m" isChecked={tempEnabledNinths.includes('minmaj7')} onClick={() => toggleNinthChord('minmaj7')}/>
                            <Checkbox label="3w, 7m, 9zw" isChecked={tempEnabledNinths.includes('minmaj7')} onClick={() => toggleNinthChord('minmaj7')}/>
                        </div>
                        <div className='ninthstypeselector-column'>
                            <Checkbox label="5cz, 7w, 9w" isChecked={tempEnabledNinths.includes('minmaj7')} onClick={() => toggleNinthChord('minmaj7')}/>
                            <Checkbox label="5cz, 7m, 9w" isChecked={tempEnabledNinths.includes('minmaj7')} onClick={() => toggleNinthChord('minmaj7')}/>
                            <Checkbox label="5zm, 7m, 9w" isChecked={tempEnabledNinths.includes('minmaj7')} onClick={() => toggleNinthChord('minmaj7')}/>
                            Przewroty
                            <Checkbox label="używaj przewrotów" isChecked={tempEnabledNinthsInversions.length > 0} onClick={() => setTempEnabledNinthsInversions(tempEnabledNinthsInversions.length > 0 ? [] : [0, 1, 2, 3])}/>
                        </div>
                    </div>
                </div>
                <div className="acceptcancel">
                    <Button label="OK" onClick={acceptChanges}/>
                    <Button label="Anuluj" onClick={hideOverlay}/>
                </div>
            </div>
        </NinthsContext.Provider>
    );

}

export default Ninths;
