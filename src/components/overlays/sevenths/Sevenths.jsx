import React, { useContext, useEffect, useState } from 'react';
import Button from '../buttons/button/Button';
import { GlobalSettingsContext } from '../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../managers/OverlaysManager';
import Checkbox from '../checkbox/Checkbox';
import './style.css';

const SeventhsContext = React.createContext();

function Sevenths() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { enabledChords, setEnabledSevenths } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledSeventhsInversions } = useContext(GlobalSettingsContext);
    const [ tempEnabledSevenths, setTempEnabledSevenths ] = useState(enabledChords['sevenths']);
    const [ tempEnabledSeventhsInversions, setTempEnabledSeventhsInversions ] = useState(enabledInversions['sevenths']);

    const acceptChanges = () => {
        setEnabledSevenths(tempEnabledSevenths);
        setEnabledSeventhsInversions(tempEnabledSeventhsInversions);
        hideOverlay();
    };

    const toggleSeventhChord = (type) => {
        if(tempEnabledSevenths.includes(type)) setTempEnabledSevenths(tempEnabledSevenths.filter(chord => chord !== type));
        else setTempEnabledSevenths([...tempEnabledSevenths, type]);
    }

    const toggleInversion = (inversion) => {
        if(tempEnabledSeventhsInversions.includes(inversion)) setTempEnabledSeventhsInversions(tempEnabledSeventhsInversions.filter(inv => inv !== inversion));
        else setTempEnabledSeventhsInversions([...tempEnabledSeventhsInversions, inversion]);
    }

    useEffect(() => {
        console.log(tempEnabledSevenths)
    }, [tempEnabledSevenths]);

    useEffect(() => {
        console.log(tempEnabledSeventhsInversions)
    }, [tempEnabledSeventhsInversions]);

    return (
        <SeventhsContext.Provider value={{setEnabledSevenths, setEnabledSeventhsInversions}}>
            <div className="sevenths">
                <div className='seventhstypeselector'>
                    Czterodźwięk:
                    <div className='seventhstypeselector-columns'>
                        <div className='seventhstypeselector-column'>
                            <Checkbox label="Durowy (7<)" isChecked={tempEnabledSevenths.includes('maj7')} onClick={() => toggleSeventhChord('maj7')}/>
                            <Checkbox label="Dominantowy" isChecked={tempEnabledSevenths.includes('dom7')} onClick={() => toggleSeventhChord('dom7')}/>
                            <Checkbox label="Molowy (7>)" isChecked={tempEnabledSevenths.includes('min7')} onClick={() => toggleSeventhChord('min7')}/>
                            <Checkbox label="Molowy (7<)" isChecked={tempEnabledSevenths.includes('minmaj7')} onClick={() => toggleSeventhChord('minmaj7')}/>
                        </div>
                        <div className='seventhstypeselector-column'>
                            <Checkbox label="Zmniejszony" isChecked={tempEnabledSevenths.includes('dim7')} onClick={() => toggleSeventhChord('dim7')}/>
                            <Checkbox label="Półzmniejszony" isChecked={tempEnabledSevenths.includes('min7b5')} onClick={() => toggleSeventhChord('min7b5')}/>
                            <Checkbox label="Zwiększony (7>)" isChecked={tempEnabledSevenths.includes('aug7')} onClick={() => toggleSeventhChord('aug7')}/>
                            <Checkbox label="Zwiększony (7<)" isChecked={tempEnabledSevenths.includes('augmaj7')} onClick={() => toggleSeventhChord('augmaj7')}/>
                        </div>
                    </div>
                </div>
                <div className='seventhsinversionselector'>
                    Przewrót:
                    <Checkbox label="Postać zas." isChecked={tempEnabledSeventhsInversions.includes(0)} onClick={() => toggleInversion(0)}/>
                    <Checkbox label="I przewrót" isChecked={tempEnabledSeventhsInversions.includes(1)} onClick={() => toggleInversion(1)}/>
                    <Checkbox label="II przewrót" isChecked={tempEnabledSeventhsInversions.includes(2)} onClick={() => toggleInversion(2)}/>
                    <Checkbox label="III przewrót" isChecked={tempEnabledSeventhsInversions.includes(3)} onClick={() => toggleInversion(3)}/>
                </div>
                <div className="acceptcancel">
                    <Button label="OK" onClick={acceptChanges}/>
                    <Button label="Anuluj" onClick={hideOverlay}/>
                </div>
            </div>
        </SeventhsContext.Provider>
    );

}

export default Sevenths;
