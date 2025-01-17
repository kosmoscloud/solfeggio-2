import React, { useContext, useState } from 'react';

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

function Triads({sliderEnabled=false}) {
    const { hideOverlay, showAlert } = useContext(UIContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledInversionsByType } = useContext(GlobalSettingsContext);
    const { triadsN, setTriadsN } = useContext(GlobalSettingsContext);
    const [ tempEnabledTriads, setTempEnabledTriads ] = useState(enabledChords['triads']);
    const [ tempEnabledTriadsInversions, setTempEnabledTriadsInversions ] = useState(enabledInversions['triads']);

    const acceptChanges = () => {
        if (tempEnabledTriads === enabledChords['triads'] && tempEnabledTriadsInversions === enabledInversions['triads']) {
            hideOverlay();
            return;
        }
        if (tempEnabledTriads.length === 0) {
            showAlert("Musisz wybrać przynajmniej jeden trójdźwięk!");
            return;
        }
        if (tempEnabledTriadsInversions.length === 0) {
            showAlert("Musisz wybrać przynajmniej jeden przewrót!");
            return;
        }
        setEnabledChordsByType('triads', tempEnabledTriads);
        setEnabledInversionsByType('triads', tempEnabledTriadsInversions);
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

    return (
        <Overlay>
            <Table>
                <Column>
                    <Text>Trójdźwięki:</Text>
                    <Checkbox label="Durowy" isChecked={tempEnabledTriads.includes('maj')} onClick={() => toggleTriad('maj')}/>
                    <Checkbox label="Molowy" isChecked={tempEnabledTriads.includes('min')} onClick={() => toggleTriad('min')}/>
                    <Checkbox label="Zmniejszony" isChecked={tempEnabledTriads.includes('dim')} onClick={() => toggleTriad('dim')}/>
                    <Checkbox label="Zwiększony" isChecked={tempEnabledTriads.includes('aug')} onClick={() => toggleTriad('aug')}/>
                </Column>
                <Column>
                    <Text>Przewroty:</Text>
                    <Checkbox label="Postać zas." isChecked={tempEnabledTriadsInversions.includes(0)} onClick={() => toggleTriadsInversion(0)}/>
                    <Checkbox label="I przewrót" isChecked={tempEnabledTriadsInversions.includes(1)} onClick={() => toggleTriadsInversion(1)}/>
                    <Checkbox label="II przewrót" isChecked={tempEnabledTriadsInversions.includes(2)} onClick={() => toggleTriadsInversion(2)}/>
                    <Spacer length={1} />
                </Column>
                <Column width={0.5}>
                    <Button label="OK" onClick={acceptChanges}/>
                    <Button label="Anuluj" onClick={hideOverlay}/>
                    {sliderEnabled && <Spacer length={1} />}
                    {sliderEnabled && <Text>Przykłady:</Text>}
                    {sliderEnabled && <Slider min={1} max={5} initialValue={triadsN} onChange={setTriadsN} />}
                    {!sliderEnabled && <Spacer length={4} />}
                </Column>
            </Table>
        </Overlay>
    );

}

export default Triads;
