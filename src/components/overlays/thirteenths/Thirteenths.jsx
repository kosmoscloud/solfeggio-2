import React, { useContext, useEffect, useState } from 'react';
import Button from '../buttons/button/Button';
import { GlobalSettingsContext } from '../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../managers/OverlaysManager';
import Checkbox from '../checkbox/Checkbox';
import './style.css';

const ThirteenthsContext = React.createContext();

function Thirteenths() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { enabledChords, setEnabledThirteenths } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledThirteenthsInversions } = useContext(GlobalSettingsContext);
    const [ tempEnabledThirteenths, setTempEnabledThirteenths ] = useState(enabledChords['thirteenths']);
    const [ tempEnabledThirteenthsInversions, setTempEnabledThirteenthsInversions ] = useState(enabledInversions['thirteenths']);

    const acceptChanges = () => {
        setEnabledThirteenths(tempEnabledThirteenths);
        setEnabledThirteenthsInversions(tempEnabledThirteenthsInversions);
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
        <ThirteenthsContext.Provider value={{setEnabledThirteenths, setEnabledThirteenthsInversions}}>
            <div className="thirteenths">
                <div className='thirteenthstypeselector'>
                    Akordy z tercdecymą:
                    <div className='thirteenthstypeselector-columns'>
                        <div className='thirteenthstypeselector-column'>
                            <Checkbox label="3w, 13w, 7w" isChecked={tempEnabledThirteenths.includes('maj7')} onClick={() => toggleThirteenthChord('maj7')}/>
                            <Checkbox label="3m, 13w, 7w" isChecked={tempEnabledThirteenths.includes('dom7')} onClick={() => toggleThirteenthChord('dom7')}/>
                            <Checkbox label="3w, 13w, 7m" isChecked={tempEnabledThirteenths.includes('min7')} onClick={() => toggleThirteenthChord('min7')}/>
                            <Checkbox label="3m, 13w, 7m" isChecked={tempEnabledThirteenths.includes('minmaj7')} onClick={() => toggleThirteenthChord('minmaj7')}/>
                            <Checkbox label="3w, 13w, 9w" isChecked={tempEnabledThirteenths.includes('minmaj7')} onClick={() => toggleThirteenthChord('minmaj7')}/>
                        </div>
                        <div className='thirteenthstypeselector-column'>
                            <Checkbox label="3m, 13w, 9w" isChecked={tempEnabledThirteenths.includes('minmaj7')} onClick={() => toggleThirteenthChord('minmaj7')}/>
                            <Checkbox label="3w, 13w, 9m" isChecked={tempEnabledThirteenths.includes('minmaj7')} onClick={() => toggleThirteenthChord('minmaj7')}/>
                            <Checkbox label="3m, 13w, 9m" isChecked={tempEnabledThirteenths.includes('minmaj7')} onClick={() => toggleThirteenthChord('minmaj7')}/>
                            Przewroty
                            <Checkbox label="używaj przewrotów" isChecked={tempEnabledThirteenthsInversions.length > 0} onClick={() => setTempEnabledThirteenthsInversions(tempEnabledThirteenthsInversions.length > 0 ? [] : [0, 1, 2, 3])}/>
                        </div>
                    </div>
                </div>
                <div className="acceptcancel">
                    <Button label="OK" onClick={acceptChanges}/>
                    <Button label="Anuluj" onClick={hideOverlay}/>
                </div>
            </div>
        </ThirteenthsContext.Provider>
    );

}

export default Thirteenths;
