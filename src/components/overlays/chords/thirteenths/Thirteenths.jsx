import React, { useContext, useEffect, useState } from 'react';
import Button from '../../../button/Button';
import { GlobalSettingsContext } from '../../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../../managers/OverlaysManager';
import Checkbox from '../../../checkbox/Checkbox';
import './style.css';

function Thirteenths() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledInversionsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledThirteenths, setTempEnabledThirteenths ] = useState(enabledChords['thirteenths']);
    const [ tempEnabledThirteenthsInversions, setTempEnabledThirteenthsInversions ] = useState(enabledInversions['thirteenths']);

    const acceptChanges = () => {
        if (tempEnabledThirteenths === enabledChords['thirteenths'] && tempEnabledThirteenthsInversions === enabledInversions['thirteenths']) {
            hideOverlay();
            return;
        }
        setEnabledChordsByType('thirteenths', tempEnabledThirteenths);
        setEnabledInversionsByType('thirteenths', tempEnabledThirteenthsInversions);
        hideOverlay();
    };

    const toggleThirteenthChord = (type) => {
        if(tempEnabledThirteenths.includes(type)) setTempEnabledThirteenths(tempEnabledThirteenths.filter(chord => chord !== type));
        else setTempEnabledThirteenths([...tempEnabledThirteenths, type]);
    }

    useEffect(() => {
        console.log(tempEnabledThirteenths)
    }, [tempEnabledThirteenths]);

    useEffect(() => {
        console.log(tempEnabledThirteenthsInversions)
    }, [tempEnabledThirteenthsInversions]);

    return (
        <div className="thirteenths">
            <div className='thirteenthstypeselector'>
                Akordy z tercdecymą:
                <div className='thirteenthstypeselector-columns'>
                    <div className='thirteenthstypeselector-column'>
                        <Checkbox label="3w, 13w, 7w" isChecked={tempEnabledThirteenths.includes('3w13w7w')} onClick={() => toggleThirteenthChord('3w13w7w')}/>
                        <Checkbox label="3m, 13w, 7w" isChecked={tempEnabledThirteenths.includes('3m13w7w')} onClick={() => toggleThirteenthChord('3m13w7w')}/>
                        <Checkbox label="3w, 13w, 7m" isChecked={tempEnabledThirteenths.includes('3w13w7m')} onClick={() => toggleThirteenthChord('3w13w7m')}/>
                        <Checkbox label="3m, 13w, 7m" isChecked={tempEnabledThirteenths.includes('3m13w7m')} onClick={() => toggleThirteenthChord('3m13w7m')}/>
                        <Checkbox label="3w, 13w, 9w" isChecked={tempEnabledThirteenths.includes('3w13w9w')} onClick={() => toggleThirteenthChord('3w13w9w')}/>
                    </div>
                    <div className='thirteenthstypeselector-column'>
                        <Checkbox label="3m, 13w, 9w" isChecked={tempEnabledThirteenths.includes('3m13w9w')} onClick={() => toggleThirteenthChord('3m13w9w')}/>
                        <Checkbox label="3w, 13w, 9m" isChecked={tempEnabledThirteenths.includes('3w13w9m')} onClick={() => toggleThirteenthChord('3w13w9m')}/>
                        <Checkbox label="3m, 13w, 9m" isChecked={tempEnabledThirteenths.includes('3m13w9m')} onClick={() => toggleThirteenthChord('3m13w9m')}/>
                        Przewroty
                        <Checkbox label="używaj przewrotów" isChecked={tempEnabledThirteenthsInversions.length > 1} onClick={() => setTempEnabledThirteenthsInversions(tempEnabledThirteenthsInversions.length > 1 ? [0] : [0, 1, 2, 3])}/>
                    </div>
                </div>
            </div>
            <div className="thirteenthsacceptcancel">
                <Button label="OK" onClick={acceptChanges}/>
                <Button label="Anuluj" onClick={hideOverlay}/>
            </div>
        </div>
    );

}

export default Thirteenths;
