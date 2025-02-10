import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../../managers/GlobalSettingsLayer';
import { UIContext } from '../../../managers/UILayer';

import Checkbox from '../../../components/Checkbox';

import FlexContainer from '../../../components/FlexContainer';
import Text from '../../../components/Text';
import Spacer from '../../../components/FlexContainer';

import Overlay from '../Overlay';
import OKCancel from '../okcancel/OKCancel';

function Random() {
    const { showElement, lastOpenedElement } = useContext(UIContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledRandomChords, setTempEnabledRandomChords ] = useState(enabledChords['random']);

    const acceptChanges = () => {
        if (tempEnabledRandomChords === enabledChords['random']) {
            showElement(lastOpenedElement);
            return;
        }
        setEnabledChordsByType('random', tempEnabledRandomChords);
        showElement(lastOpenedElement);
    };

    const toggleRandom = (type) => {
        if(tempEnabledRandomChords.includes(type)) setTempEnabledRandomChords(tempEnabledRandomChords.filter(chord => chord !== type));
        else setTempEnabledRandomChords([...tempEnabledRandomChords, type]);
    }

    return (
        <Overlay>
            <FlexContainer direction='row'>
                <FlexContainer>
                    <Text>Akordy przypadkowe:</Text>
                    <Checkbox label="Dwudźwięk" isChecked={tempEnabledRandomChords.includes(2)} onClick={() => toggleRandom(2)}/>
                    <Checkbox label="Trójdźwięk" isChecked={tempEnabledRandomChords.includes(3)} onClick={() => toggleRandom(3)}/>
                    <Checkbox label="Czterodźwięk" isChecked={tempEnabledRandomChords.includes(4)} onClick={() => toggleRandom(4)}/>
                </FlexContainer>
                <FlexContainer>
                    <Spacer length={0.5}/>
                    <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)}/>
                    <Spacer length={3}/>
                </FlexContainer>
            </FlexContainer>
        </Overlay>
    );

}

export default Random;
