import React, { useContext, useEffect, useState } from 'react';

import { GlobalSettingsContext } from '../../../managers/GlobalSettingsLayer';
import { UIContext } from '../../../managers/UILayer';

import Button from '../../../components/button/Button';
import Checkbox from '../../../components/checkbox/Checkbox';

import Table from '../../../components/table/Table';
import Column from '../../../components/table/column/Column';
import Text from '../../../components/text/Text';
import Spacer from '../../../components/spacer/Spacer';
import Slider from '../../../components/slider/Slider';

import Overlay from '../Overlay';

function Sevenths({sliderEnabled = false}) {
    const { hideOverlay } = useContext(UIContext); 
    const { enabledChords, setEnabledChordsByType, seventhsN, setSeventhsN } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledInversionsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledSevenths, setTempEnabledSevenths ] = useState(enabledChords['sevenths']);
    const [ tempEnabledSeventhsInversions, setTempEnabledSeventhsInversions ] = useState(enabledInversions['sevenths']);

    const acceptChanges = () => {
        if (tempEnabledSevenths === enabledChords['sevenths'] && tempEnabledSeventhsInversions === enabledInversions['sevenths']) {
            hideOverlay();
            return;
        }
        setEnabledChordsByType('sevenths', tempEnabledSevenths);
        setEnabledInversionsByType('sevenths', tempEnabledSeventhsInversions);
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

    return (
        <Overlay>
            <Table>
                <Column>
                    <Text>Akordy z septymą:</Text>
                    <Checkbox label="Durowy (7<)" isChecked={tempEnabledSevenths.includes('maj7')} onClick={() => toggleSeventhChord('maj7')}/>
                    <Checkbox label="Dominantowy" isChecked={tempEnabledSevenths.includes('dom7')} onClick={() => toggleSeventhChord('dom7')}/>
                    <Checkbox label="Molowy (7>)" isChecked={tempEnabledSevenths.includes('min7')} onClick={() => toggleSeventhChord('min7')}/>
                    <Checkbox label="Molowy (7<)" isChecked={tempEnabledSevenths.includes('minmaj7')} onClick={() => toggleSeventhChord('minmaj7')}/>
                </Column>
                <Column>
                    <Spacer length={1}/>
                    <Checkbox label="Zmniejszony" isChecked={tempEnabledSevenths.includes('dim7')} onClick={() => toggleSeventhChord('dim7')}/>
                    <Checkbox label="Półzmniejszony" isChecked={tempEnabledSevenths.includes('min7b5')} onClick={() => toggleSeventhChord('min7b5')}/>
                    <Checkbox label="Zwiększony (7>)" isChecked={tempEnabledSevenths.includes('aug7')} onClick={() => toggleSeventhChord('aug7')}/>
                    <Checkbox label="Zwiększony (7<)" isChecked={tempEnabledSevenths.includes('augmaj7')} onClick={() => toggleSeventhChord('augmaj7')}/>
                </Column>
                <Column>
                    <Text>Przewroty:</Text>
                    <Checkbox label="Postać zas." isChecked={tempEnabledSeventhsInversions.includes(0)} onClick={() => toggleInversion(0)}/>
                    <Checkbox label="I przewrót" isChecked={tempEnabledSeventhsInversions.includes(1)} onClick={() => toggleInversion(1)}/>
                    <Checkbox label="II przewrót" isChecked={tempEnabledSeventhsInversions.includes(2)} onClick={() => toggleInversion(2)}/>
                    <Checkbox label="III przewrót" isChecked={tempEnabledSeventhsInversions.includes(3)} onClick={() => toggleInversion(3)}/>
                </Column>
                <Column width={0.5}>
                    <Button label="OK" onClick={acceptChanges}/>
                    <Button label="Anuluj" onClick={hideOverlay}/>
                    {sliderEnabled && <Spacer length={1} />}
                    {sliderEnabled && <Text>Przykłady:</Text>}
                    {sliderEnabled && <Slider min={1} max={5} initialValue={seventhsN} onChange={setSeventhsN} />}
                    {!sliderEnabled && <Spacer length={4} />}
                </Column>
            </Table>
        </Overlay>
    );

}

export default Sevenths;
