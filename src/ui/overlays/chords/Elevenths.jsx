import React, { useContext, useEffect, useState } from 'react';

import { GlobalSettingsContext } from '../../../layers/GlobalSettingsLayer';
import { UIContext } from '../../../layers/UILayer';

import Checkbox from '../../../components/Checkbox';

import FlexContainer from '../../../components/FlexContainer';
import Text from '../../../components/Text';
import Spacer from '../../../components/FlexContainer';

import Overlay from '../Overlay';
import OKCancel from '../okcancel/OKCancel';

function Elevenths() {
    const { showElement, lastOpenedElement } = useContext(UIContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledInversionsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledElevenths, setTempEnabledElevenths ] = useState(enabledChords['elevenths']);
    const [ tempEnabledEleventhsInversions, setTempEnabledEleventhsInversions ] = useState(enabledInversions['elevenths']);

    const acceptChanges = () => {
        if (tempEnabledElevenths === enabledChords['elevenths'] && tempEnabledEleventhsInversions === enabledInversions['elevenths']) {
            showElement(lastOpenedElement);
            return;
        }
        setEnabledChordsByType('elevenths', tempEnabledElevenths);
        setEnabledInversionsByType('elevenths', tempEnabledEleventhsInversions);
        showElement(lastOpenedElement);
    };

    const toggleEleventhChord = (type) => {
        if(tempEnabledElevenths.includes(type)) setTempEnabledElevenths(tempEnabledElevenths.filter(chord => chord !== type));
        else setTempEnabledElevenths([...tempEnabledElevenths, type]);
    }

    return (
        <Overlay minWidth="50%" minHeight="30%">
            <FlexContainer direction='row'>
                <FlexContainer>
                    <Text>Akordy z undecymą:</Text>
                    <Checkbox label="3w, 7w, 11cz" isChecked={tempEnabledElevenths.includes('3w7w11cz')} onClick={() => toggleEleventhChord('3w7w11cz')}/>
                    <Checkbox label="3w, 7m, 11cz" isChecked={tempEnabledElevenths.includes('3w7m11cz')} onClick={() => toggleEleventhChord('3w7m11cz')}/>
                    <Checkbox label="3m, 7w, 11cz" isChecked={tempEnabledElevenths.includes('3m7w11cz')} onClick={() => toggleEleventhChord('3m7w11cz')}/>
                    <Checkbox label="3m, 7m, 11cz" isChecked={tempEnabledElevenths.includes('3m7m11cz')} onClick={() => toggleEleventhChord('3m7m11cz')}/>
                </FlexContainer>
                <FlexContainer>
                    <Spacer length={1}/>
                    <Checkbox label="3w, 7w, 11zw" isChecked={tempEnabledElevenths.includes('3w7w11zw')} onClick={() => toggleEleventhChord('3w7w11zw')}/>
                    <Checkbox label="3w, 7m, 11zw" isChecked={tempEnabledElevenths.includes('3w7m11zw')} onClick={() => toggleEleventhChord('3w7m11zw')}/>
                    <Text>Przewroty</Text>
                    <Checkbox label="używaj przewrotów" isChecked={tempEnabledEleventhsInversions.length > 1} onClick={() => setTempEnabledEleventhsInversions(tempEnabledEleventhsInversions.length > 1 ? [0] : [0, 1, 2, 3])}/>
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

export default Elevenths;
