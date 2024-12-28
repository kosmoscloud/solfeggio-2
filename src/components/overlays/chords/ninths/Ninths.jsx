import React, { useContext, useEffect, useState } from 'react';
import Button from '../../../button/Button';
import { GlobalSettingsContext } from '../../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../../managers/OverlaysManager';
import Checkbox from '../../../checkbox/Checkbox';
import './style.css';

function Ninths() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledInversionsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledNinths, setTempEnabledNinths ] = useState(enabledChords['ninths']);
    const [ tempEnabledNinthsInversions, setTempEnabledNinthsInversions ] = useState(enabledInversions['ninths']);

    const acceptChanges = () => {
        if (tempEnabledNinths === enabledChords['ninths'] && tempEnabledNinthsInversions === enabledInversions['ninths']) {
            hideOverlay();
            return;
        }
        setEnabledChordsByType('ninths', tempEnabledNinths);
        setEnabledInversionsByType('ninths', tempEnabledNinthsInversions);
        hideOverlay();
    };

    const toggleNinthChord = (type) => {
        if(tempEnabledNinths.includes(type)) setTempEnabledNinths(tempEnabledNinths.filter(chord => chord !== type));
        else setTempEnabledNinths([...tempEnabledNinths, type]);
    }

    const toggleInversion = () => setTempEnabledNinthsInversions(tempEnabledNinthsInversions.length > 1 ? [0] : [0, 1, 2, 3]);

    useEffect(() => {
        console.log(tempEnabledNinths)
    }, [tempEnabledNinths]);

    useEffect(() => {
        console.log(tempEnabledNinthsInversions)
    }, [tempEnabledNinthsInversions]);

    return (
        <div className="ninths">
            <div className='ninthstypeselector'>
                Akordy z noną:
                <div className='ninthstypeselector-columns'>
                    <div className='ninthstypeselector-column'>
                        <Checkbox label="3w, 7w, 9w" isChecked={tempEnabledNinths.includes('3w7w9w')} onClick={() => toggleNinthChord('3w7w9w')}/>
                        <Checkbox label="3w, 7m, 9w" isChecked={tempEnabledNinths.includes('3w7m9w')} onClick={() => toggleNinthChord('3w7m9w')}/>
                        <Checkbox label="3m, 7w, 9w" isChecked={tempEnabledNinths.includes('3m7w9w')} onClick={() => toggleNinthChord('3m7w9w')}/>
                        <Checkbox label="3m, 7m, 9w" isChecked={tempEnabledNinths.includes('3m7m9w')} onClick={() => toggleNinthChord('3m7m9w')}/>
                        <Checkbox label="3w, 7m, 9m" isChecked={tempEnabledNinths.includes('3w7m9m')} onClick={() => toggleNinthChord('3w7m9m')}/>
                        <Checkbox label="3w, 7m, 9zw" isChecked={tempEnabledNinths.includes('3w7m9zw')} onClick={() => toggleNinthChord('3w7m9zw')}/>
                    </div>
                    <div className='ninthstypeselector-column'>
                        <Checkbox label="5cz, 7w, 9w" isChecked={tempEnabledNinths.includes('5cz7w9w')} onClick={() => toggleNinthChord('5cz7w9w')}/>
                        <Checkbox label="5cz, 7m, 9w" isChecked={tempEnabledNinths.includes('5cz7m9w')} onClick={() => toggleNinthChord('5cz7m9w')}/>
                        <Checkbox label="5zm, 7m, 9w" isChecked={tempEnabledNinths.includes('5zm7m9w')} onClick={() => toggleNinthChord('5zm7m9w')}/>
                        Przewroty
                        <Checkbox label="używaj przewrotów" isChecked={tempEnabledNinthsInversions.length > 1} onClick={() => toggleInversion()}/>
                    </div>
                </div>
            </div>
            <div className="ninthsacceptcancel">
                <Button label="OK" onClick={acceptChanges}/>
                <Button label="Anuluj" onClick={hideOverlay}/>
            </div>
        </div>
    );

}

export default Ninths;
