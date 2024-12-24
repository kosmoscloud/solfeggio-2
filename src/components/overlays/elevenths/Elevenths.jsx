import React, { useContext, useEffect, useState } from 'react';
import Button from '../buttons/button/Button';
import { GlobalSettingsContext } from '../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../managers/OverlaysManager';
import Checkbox from '../checkbox/Checkbox';
import './style.css';

const EleventhsContext = React.createContext();

function Elevenths() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { enabledChords, setEnabledElevenths } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledEleventhsInversions } = useContext(GlobalSettingsContext);
    const [ tempEnabledElevenths, setTempEnabledElevenths ] = useState(enabledChords['elevenths']);
    const [ tempEnabledEleventhsInversions, setTempEnabledEleventhsInversions ] = useState(enabledInversions['elevenths']);

    const acceptChanges = () => {
        setEnabledElevenths(tempEnabledElevenths);
        setEnabledEleventhsInversions(tempEnabledEleventhsInversions);
        hideOverlay();
    };

    const toggleEleventhChord = (type) => {
        if(tempEnabledElevenths.includes(type)) setTempEnabledElevenths(tempEnabledElevenths.filter(chord => chord !== type));
        else setTempEnabledElevenths([...tempEnabledElevenths, type]);
    }

    const toggleInversion = (inversion) => {
        if(tempEnabledEleventhsInversions.includes(inversion)) setTempEnabledEleventhsInversions(tempEnabledEleventhsInversions.filter(inv => inv !== inversion));
        else setTempEnabledEleventhsInversions([...tempEnabledEleventhsInversions, inversion]);
    }

    useEffect(() => {
        console.log(tempEnabledElevenths)
    }, [tempEnabledElevenths]);

    useEffect(() => {
        console.log(tempEnabledEleventhsInversions)
    }, [tempEnabledEleventhsInversions]);

    return (
        <EleventhsContext.Provider value={{setEnabledElevenths, setEnabledEleventhsInversions}}>
            <div className="elevenths">
                <div className='eleventhstypeselector'>
                    Akordy z undecymą:
                    <div className='eleventhstypeselector-columns'>
                        <div className='eleventhstypeselector-column'>
                            <Checkbox label="3w, 7w, 11cz" isChecked={tempEnabledElevenths.includes('maj7')} onClick={() => toggleEleventhChord('maj7')}/>
                            <Checkbox label="3w, 7m, 11cz" isChecked={tempEnabledElevenths.includes('dom7')} onClick={() => toggleEleventhChord('dom7')}/>
                            <Checkbox label="3m, 7w, 11cz" isChecked={tempEnabledElevenths.includes('min7')} onClick={() => toggleEleventhChord('min7')}/>
                            <Checkbox label="3m, 7m, 11cz" isChecked={tempEnabledElevenths.includes('minmaj7')} onClick={() => toggleEleventhChord('minmaj7')}/>
                        </div>
                        <div className='eleventhstypeselector-column'>
                            <Checkbox label="3w, 7e, 11zw" isChecked={tempEnabledElevenths.includes('minmaj7')} onClick={() => toggleEleventhChord('minmaj7')}/>
                            <Checkbox label="3w, 7m, 11zw" isChecked={tempEnabledElevenths.includes('minmaj7')} onClick={() => toggleEleventhChord('minmaj7')}/>
                            Przewroty
                            <Checkbox label="używaj przewrotów" isChecked={tempEnabledEleventhsInversions.length > 0} onClick={() => setTempEnabledEleventhsInversions(tempEnabledEleventhsInversions.length > 0 ? [] : [0, 1, 2, 3])}/>
                        </div>
                    </div>
                </div>
                <div className="acceptcancel">
                    <Button label="OK" onClick={acceptChanges}/>
                    <Button label="Anuluj" onClick={hideOverlay}/>
                </div>
            </div>
        </EleventhsContext.Provider>
    );

}

export default Elevenths;
