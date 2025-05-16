import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../../layers/GlobalSettingsLayer';
import { UIContext } from '../../../layers/UILayer';

import Checkbox from '../../../components/Checkbox';

import FlexContainer from '../../../components/FlexContainer';
import Text from '../../../components/Text';
import Slider from '../../../components/Slider';

import Overlay from '../Overlay';
import OKCancel from '../okcancel/OKCancel';

function Sevenths({sliderEnabled = false}) {
    const { showElement, lastOpenedElement } = useContext(UIContext); 
    const { enabledChords, setEnabledChordsByType, seventhsN, setSeventhsN } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledInversionsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledSevenths, setTempEnabledSevenths ] = useState(enabledChords['sevenths']);
    const [ tempEnabledSeventhsInversions, setTempEnabledSeventhsInversions ] = useState(enabledInversions['sevenths']);

    const acceptChanges = () => {
        if (tempEnabledSevenths === enabledChords['sevenths'] && tempEnabledSeventhsInversions === enabledInversions['sevenths']) {
            showElement(lastOpenedElement);
            return;
        }
        setEnabledChordsByType('sevenths', tempEnabledSevenths);
        setEnabledInversionsByType('sevenths', tempEnabledSeventhsInversions);
        showElement(lastOpenedElement);
    };

    const toggleSeventhChord = (type) => {
        if(tempEnabledSevenths.includes(type)) setTempEnabledSevenths(tempEnabledSevenths.filter(chord => chord !== type));
        else setTempEnabledSevenths([...tempEnabledSevenths, type]);
    }

    const toggleInversion = (inversion) => {
        if(tempEnabledSeventhsInversions.includes(inversion)) setTempEnabledSeventhsInversions(tempEnabledSeventhsInversions.filter(inv => inv !== inversion));
        else setTempEnabledSeventhsInversions([...tempEnabledSeventhsInversions, inversion]);
    }

    return (
        <div>
            <Overlay minWidth="60%" minHeight="45%">
                <FlexContainer direction='row'>
                    <FlexContainer>
                        <Text center={false}>Akordy z septymą:</Text>
                        <Checkbox label="Durowy (7<)" isChecked={tempEnabledSevenths.includes('maj7')} onClick={() => toggleSeventhChord('maj7')}/>
                        <Checkbox label="Dominantowy" isChecked={tempEnabledSevenths.includes('dom7')} onClick={() => toggleSeventhChord('dom7')}/>
                        <Checkbox label="Molowy (7>)" isChecked={tempEnabledSevenths.includes('min7')} onClick={() => toggleSeventhChord('min7')}/>
                        <Checkbox label="Molowy (7<)" isChecked={tempEnabledSevenths.includes('minmaj7')} onClick={() => toggleSeventhChord('minmaj7')}/>
                    </FlexContainer>
                    <FlexContainer>
                        <FlexContainer length={1} padding={false}/>
                        <Checkbox label="Zmniejszony" isChecked={tempEnabledSevenths.includes('dim7')} onClick={() => toggleSeventhChord('dim7')}/>
                        <Checkbox label="Półzmniejszony" isChecked={tempEnabledSevenths.includes('min7b5')} onClick={() => toggleSeventhChord('min7b5')}/>
                        <Checkbox label="Zwiększony (7>)" isChecked={tempEnabledSevenths.includes('aug7')} onClick={() => toggleSeventhChord('aug7')}/>
                        <Checkbox label="Zwiększony (7<)" isChecked={tempEnabledSevenths.includes('augmaj7')} onClick={() => toggleSeventhChord('augmaj7')}/>
                    </FlexContainer>
                    <FlexContainer length={1}/>
                    <FlexContainer>
                        <Text center={false}>Przewroty:</Text>
                        <Checkbox label="Postać zas." isChecked={tempEnabledSeventhsInversions.includes(0)} onClick={() => toggleInversion(0)}/>
                        <Checkbox label="I przewrót" isChecked={tempEnabledSeventhsInversions.includes(1)} onClick={() => toggleInversion(1)}/>
                        <Checkbox label="II przewrót" isChecked={tempEnabledSeventhsInversions.includes(2)} onClick={() => toggleInversion(2)}/>
                        <Checkbox label="III przewrót" isChecked={tempEnabledSeventhsInversions.includes(3)} onClick={() => toggleInversion(3)}/>
                    </FlexContainer>
                    <FlexContainer length={0.5}>
                        {sliderEnabled && <FlexContainer length={1} />}
                        {sliderEnabled && <Text>Przykłady:</Text>}
                        {sliderEnabled && <Slider min={1} max={5} initialValue={seventhsN} onChange={setSeventhsN} />}
                        {!sliderEnabled && <FlexContainer length={4} />}
                    </FlexContainer>
                </FlexContainer>
            </Overlay>
            <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)} top='80%'/>
        </div>
    );

}

export default Sevenths;
