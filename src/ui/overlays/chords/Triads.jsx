import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../../layers/GlobalSettingsLayer';
import { LanguageContext, UIContext } from '../../../layers/UILayer';

import OKCancel from '../../../ui/overlays/okcancel/OKCancel';
import Checkbox from '../../../components/Checkbox';

import FlexContainer from '../../../components/FlexContainer';
import Text from '../../../components/Text';
import Slider from '../../../components/Slider';

import Overlay from '../Overlay';

function Triads({sliderEnabled=false}) {
    const { showElement, lastOpenedElement, showAlert } = useContext(UIContext); 
    const { dictionary } = useContext(LanguageContext);
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
            <Overlay minWidth="50%" minHeight={sliderEnabled ? "50%" : "40%"}>
                <FlexContainer direction='column' padding={false}>
                    <FlexContainer direction='row' length={5} padding={false}>
                        <FlexContainer padding={false}>
                            <Text center={false}>Trójdźwięki:</Text>
                            <Checkbox label={dictionary.major} isChecked={tempEnabledTriads.includes('maj')} onClick={() => toggleTriad('maj')}/>
                            <Checkbox label={dictionary.minor} isChecked={tempEnabledTriads.includes('min')} onClick={() => toggleTriad('min')}/>
                            <Checkbox label={dictionary.diminished} isChecked={tempEnabledTriads.includes('dim')} onClick={() => toggleTriad('dim')}/>
                            <Checkbox label={dictionary.augmented} isChecked={tempEnabledTriads.includes('aug')} onClick={() => toggleTriad('aug')}/>
                        </FlexContainer>
                        <FlexContainer padding={false}>
                            <Text center={false}>Przewroty:</Text>
                            <Checkbox label="Postać zas." isChecked={tempEnabledTriadsInversions.includes(0)} onClick={() => toggleTriadsInversion(0)}/>
                            <Checkbox label="I przewrót" isChecked={tempEnabledTriadsInversions.includes(1)} onClick={() => toggleTriadsInversion(1)}/>
                            <Checkbox label="II przewrót" isChecked={tempEnabledTriadsInversions.includes(2)} onClick={() => toggleTriadsInversion(2)}/>
                            <FlexContainer length={1}/>
                        </FlexContainer>
                    </FlexContainer>
                    {sliderEnabled && <FlexContainer direction='row' length={1} padding={false}>
                        <FlexContainer padding={false} length={1}>
                            <Text center={false}>Liczba przykładów:</Text>
                        </FlexContainer>
                        <FlexContainer padding={true} length={2}>
                            <Slider value={triadsN} onChange={setTriadsN} min={1} max={4} enabled={sliderEnabled}/>
                        </FlexContainer>
                    </FlexContainer>}
                </FlexContainer>
            </Overlay>
            <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)} top={sliderEnabled ? '85%' : "80%"}/>
        </div>
    );

}

export default Triads;
