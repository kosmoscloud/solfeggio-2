import React, { useContext, useEffect, useState } from 'react';

import { GlobalSettingsContext } from '../../../layers/GlobalSettingsLayer';
import { UIContext } from '../../../layers/UILayer';

import Checkbox from '../../../components/Checkbox';

import Text from '../../../components/Text';
import FlexContainer from '../../../components/FlexContainer';

import Overlay from '../Overlay';
import OKCancel from '../okcancel/OKCancel';

function Ninths() {
    const { showElement, lastOpenedElement } = useContext(UIContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledInversionsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledNinths, setTempEnabledNinths ] = useState(enabledChords['ninths']);
    const [ tempEnabledNinthsInversions, setTempEnabledNinthsInversions ] = useState(enabledInversions['ninths']);

    const acceptChanges = () => {
        if (tempEnabledNinths === enabledChords['ninths'] && tempEnabledNinthsInversions === enabledInversions['ninths']) {
            showElement(lastOpenedElement);
            return;
        }
        setEnabledChordsByType('ninths', tempEnabledNinths);
        setEnabledInversionsByType('ninths', tempEnabledNinthsInversions);
        showElement(lastOpenedElement);
    };

    const toggleNinthChord = (type) => {
        if(tempEnabledNinths.includes(type)) setTempEnabledNinths(tempEnabledNinths.filter(chord => chord !== type));
        else setTempEnabledNinths([...tempEnabledNinths, type]);
    }

    const toggleInversion = () => setTempEnabledNinthsInversions(tempEnabledNinthsInversions.length > 1 ? [0] : [0, 1, 2, 3]);

    return (
        <Overlay minWidth="50%" minHeight="40%">
            <FlexContainer direction='row'>
                <FlexContainer length={0.1} />
                <FlexContainer>
                    <FlexContainer length={0.1}/>
                    <Text>Akordy z noną:</Text>
                    <Checkbox label="3w, 7w, 9w" isChecked={tempEnabledNinths.includes('3w7w9w')} onClick={() => toggleNinthChord('3w7w9w')}/>
                    <Checkbox label="3w, 7m, 9w" isChecked={tempEnabledNinths.includes('3w7m9w')} onClick={() => toggleNinthChord('3w7m9w')}/>
                    <Checkbox label="3m, 7w, 9w" isChecked={tempEnabledNinths.includes('3m7w9w')} onClick={() => toggleNinthChord('3m7w9w')}/>
                    <Checkbox label="3m, 7m, 9w" isChecked={tempEnabledNinths.includes('3m7m9w')} onClick={() => toggleNinthChord('3m7m9w')}/>
                    <Checkbox label="3w, 7m, 9m" isChecked={tempEnabledNinths.includes('3w7m9m')} onClick={() => toggleNinthChord('3w7m9m')}/>
                    <Checkbox label="3w, 7m, 9zw" isChecked={tempEnabledNinths.includes('3w7m9zw')} onClick={() => toggleNinthChord('3w7m9zw')}/>
                    <FlexContainer length={0.1}/>
                </FlexContainer>
                <FlexContainer>
                    <FlexContainer length={0.1}/>
                    <FlexContainer length={1}/>
                    <Checkbox label="5cz, 7w, 9w" isChecked={tempEnabledNinths.includes('5cz7w9w')} onClick={() => toggleNinthChord('5cz7w9w')}/>
                    <Checkbox label="5cz, 7m, 9w" isChecked={tempEnabledNinths.includes('5cz7m9w')} onClick={() => toggleNinthChord('5cz7m9w')}/>
                    <Checkbox label="5zm, 7m, 9w" isChecked={tempEnabledNinths.includes('5zm7m9w')} onClick={() => toggleNinthChord('5zm7m9w')}/>
                    <FlexContainer length={1}/>
                    <Text>Przewroty</Text>
                    <Checkbox label="włącz przewroty" isChecked={tempEnabledNinthsInversions.length > 1} onClick={() => toggleInversion()}/>
                    <FlexContainer length={0.1}/>
                </FlexContainer>
                <FlexContainer width={0.5}>
                    <FlexContainer length={0.5}/>
                    <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)}/>
                    <FlexContainer length={3.5}/>
                </FlexContainer>
                <FlexContainer length={0.1}/>
            </FlexContainer>
        </Overlay>
    );

}

export default Ninths;
