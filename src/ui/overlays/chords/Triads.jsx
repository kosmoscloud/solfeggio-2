import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../../layers/GlobalSettingsLayer';
import { UIContext } from '../../../layers/UILayer';

import OKCancel from '../../../ui/overlays/okcancel/OKCancel';
import Checkbox from '../../../components/Checkbox';

import FlexContainer from '../../../components/FlexContainer';
import Text from '../../../components/Text';
import Spacer from '../../../components/FlexContainer';
import Slider from '../../../components/Slider';

import Overlay from '../Overlay';
import NoteAdjustmentSliders from '../noteadjustmentsliders/NoteAdjustmentSliders';

function Triads({sliderEnabled=false}) {
    const { showElement, lastOpenedElement, showAlert } = useContext(UIContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledInversionsByType } = useContext(GlobalSettingsContext);
    const { triadsN, setTriadsN } = useContext(GlobalSettingsContext);
    const [ tempEnabledTriads, setTempEnabledTriads ] = useState(enabledChords['triads']);
    const [ tempEnabledTriadsInversions, setTempEnabledTriadsInversions ] = useState(enabledInversions['triads']);

    const acceptChanges = () => {
        if (tempEnabledTriads === enabledChords['triads'] && tempEnabledTriadsInversions === enabledInversions['triads']) {
            showElement(lastOpenedElement);
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
        showElement(lastOpenedElement);
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
        <div>
            <Overlay minWidth="50%" minHeight="40%">
                <FlexContainer direction='row' length={3}>
                    <FlexContainer>
                        <Text center={false}>Trójdźwięki:</Text>
                        <Checkbox label="Durowy" isChecked={tempEnabledTriads.includes('maj')} onClick={() => toggleTriad('maj')}/>
                        <Checkbox label="Molowy" isChecked={tempEnabledTriads.includes('min')} onClick={() => toggleTriad('min')}/>
                        <Checkbox label="Zmniejszony" isChecked={tempEnabledTriads.includes('dim')} onClick={() => toggleTriad('dim')}/>
                        <Checkbox label="Zwiększony" isChecked={tempEnabledTriads.includes('aug')} onClick={() => toggleTriad('aug')}/>
                    </FlexContainer>
                    <FlexContainer>
                        <Text center={false}>Przewroty:</Text>
                        <Checkbox label="Postać zas." isChecked={tempEnabledTriadsInversions.includes(0)} onClick={() => toggleTriadsInversion(0)}/>
                        <Checkbox label="I przewrót" isChecked={tempEnabledTriadsInversions.includes(1)} onClick={() => toggleTriadsInversion(1)}/>
                        <Checkbox label="II przewrót" isChecked={tempEnabledTriadsInversions.includes(2)} onClick={() => toggleTriadsInversion(2)}/>
                        {sliderEnabled && <FlexContainer length={1}>
                                <Text center={false}>Ilość przykładów:</Text>
                                <Slider min={1} max={5} value={triadsN} onChange={setTriadsN} />
                            </FlexContainer>}
                        {!sliderEnabled && <Spacer length={1}/>}
                    </FlexContainer>
                </FlexContainer>
            </Overlay>
            <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)} top='80%'/>
        </div>
    );

}

export default Triads;
