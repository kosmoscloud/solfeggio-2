import React, { useContext, useEffect, useState } from 'react';
import Button from '../../../button/Button';
import { GlobalSettingsContext } from '../../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../../managers/OverlaysManager';
import Checkbox from '../../../checkbox/Checkbox';
import './style.css';

function Elevenths() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledInversionsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledElevenths, setTempEnabledElevenths ] = useState(enabledChords['elevenths']);
    const [ tempEnabledEleventhsInversions, setTempEnabledEleventhsInversions ] = useState(enabledInversions['elevenths']);

    const acceptChanges = () => {
        if (tempEnabledElevenths === enabledChords['elevenths'] && tempEnabledEleventhsInversions === enabledInversions['elevenths']) {
            hideOverlay();
            return;
        }
        setEnabledChordsByType('elevenths', tempEnabledElevenths);
        setEnabledInversionsByType('elevenths', tempEnabledEleventhsInversions);
        hideOverlay();
    };

    const toggleEleventhChord = (type) => {
        if(tempEnabledElevenths.includes(type)) setTempEnabledElevenths(tempEnabledElevenths.filter(chord => chord !== type));
        else setTempEnabledElevenths([...tempEnabledElevenths, type]);
    }

    useEffect(() => {
        console.log(tempEnabledElevenths)
    }, [tempEnabledElevenths]);

    useEffect(() => {
        console.log(tempEnabledEleventhsInversions)
    }, [tempEnabledEleventhsInversions]);

    return (
        <div className="elevenths">
            <div className='eleventhstypeselector'>
                Akordy z undecymą:
                <div className='eleventhstypeselector-columns'>
                    <div className='eleventhstypeselector-column'>
                        <Checkbox label="3w, 7w, 11cz" isChecked={tempEnabledElevenths.includes('3w7w11cz')} onClick={() => toggleEleventhChord('3w7w11cz')}/>
                        <Checkbox label="3w, 7m, 11cz" isChecked={tempEnabledElevenths.includes('3w7m11cz')} onClick={() => toggleEleventhChord('3w7m11cz')}/>
                        <Checkbox label="3m, 7w, 11cz" isChecked={tempEnabledElevenths.includes('3m7w11cz')} onClick={() => toggleEleventhChord('3m7w11cz')}/>
                        <Checkbox label="3m, 7m, 11cz" isChecked={tempEnabledElevenths.includes('3m7m11cz')} onClick={() => toggleEleventhChord('3m7m11cz')}/>
                    </div>
                    <div className='eleventhstypeselector-column'>
                        <Checkbox label="3w, 7w, 11zw" isChecked={tempEnabledElevenths.includes('3w7w11zw')} onClick={() => toggleEleventhChord('3w7w11zw')}/>
                        <Checkbox label="3w, 7m, 11zw" isChecked={tempEnabledElevenths.includes('3w7m11zw')} onClick={() => toggleEleventhChord('3w7m11zw')}/>
                        Przewroty
                        <Checkbox label="używaj przewrotów" isChecked={tempEnabledEleventhsInversions.length > 1} onClick={() => setTempEnabledEleventhsInversions(tempEnabledEleventhsInversions.length > 1 ? [0] : [0, 1, 2, 3])}/>
                    </div>
                </div>
            </div>
            <div className="eleventhsacceptcancel">
                <Button label="OK" onClick={acceptChanges}/>
                <Button label="Anuluj" onClick={hideOverlay}/>
            </div>
        </div>
    );

}

export default Elevenths;
