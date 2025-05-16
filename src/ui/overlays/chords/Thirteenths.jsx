import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../../layers/GlobalSettingsLayer';
import { UIContext } from '../../../layers/UILayer';

import Checkbox from '../../../components/Checkbox';

import FlexContainer from '../../../components/FlexContainer';
import Text from '../../../components/Text';
import Spacer from '../../../components/FlexContainer';

import Overlay from '../Overlay';
import OKCancel from '../okcancel/OKCancel';
import NoteAdjustmentSliders from '../noteadjustmentsliders/NoteAdjustmentSliders';

function Thirteenths() {
    const { showElement, lastOpenedElement } = useContext(UIContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledInversionsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledThirteenths, setTempEnabledThirteenths ] = useState(enabledChords['thirteenths']);
    const [ tempEnabledThirteenthsInversions, setTempEnabledThirteenthsInversions ] = useState(enabledInversions['thirteenths']);

    const acceptChanges = () => {
        if (tempEnabledThirteenths === enabledChords['thirteenths'] && tempEnabledThirteenthsInversions === enabledInversions['thirteenths']) {
            showElement(lastOpenedElement);
            return;
        }
        setEnabledChordsByType('thirteenths', tempEnabledThirteenths);
        setEnabledInversionsByType('thirteenths', tempEnabledThirteenthsInversions);
        showElement(lastOpenedElement);
    };

    const toggleThirteenthChord = (type) => {
        if(tempEnabledThirteenths.includes(type)) setTempEnabledThirteenths(tempEnabledThirteenths.filter(chord => chord !== type));
        else setTempEnabledThirteenths([...tempEnabledThirteenths, type]);
    }

    return (
        <Overlay minWidth="50%" minHeight="60%">
            <FlexContainer>
                <FlexContainer>
                    <Text center={false}>Akordy z tercdecymą:</Text>
                </FlexContainer>
                <FlexContainer direction='row' length={3}>
                    <FlexContainer>
                        <Checkbox label="3w, 13w, 7w" isChecked={tempEnabledThirteenths.includes('3w13w7w')} onClick={() => toggleThirteenthChord('3w13w7w')}/>
                        <Checkbox label="3m, 13w, 7w" isChecked={tempEnabledThirteenths.includes('3m13w7w')} onClick={() => toggleThirteenthChord('3m13w7w')}/>
                        <Checkbox label="3w, 13w, 7m" isChecked={tempEnabledThirteenths.includes('3w13w7m')} onClick={() => toggleThirteenthChord('3w13w7m')}/>
                        <Checkbox label="3m, 13w, 7m" isChecked={tempEnabledThirteenths.includes('3m13w7m')} onClick={() => toggleThirteenthChord('3m13w7m')}/>
                        <Checkbox label="3w, 13w, 9w" isChecked={tempEnabledThirteenths.includes('3w13w9w')} onClick={() => toggleThirteenthChord('3w13w9w')}/>
                    </FlexContainer>
                    <FlexContainer>
                        <Checkbox label="3m, 13w, 9w" isChecked={tempEnabledThirteenths.includes('3m13w9w')} onClick={() => toggleThirteenthChord('3m13w9w')}/>
                        <Checkbox label="3w, 13w, 9m" isChecked={tempEnabledThirteenths.includes('3w13w9m')} onClick={() => toggleThirteenthChord('3w13w9m')}/>
                        <Checkbox label="3m, 13w, 9m" isChecked={tempEnabledThirteenths.includes('3m13w9m')} onClick={() => toggleThirteenthChord('3m13w9m')}/>
                        <Text center={false}>Przewroty</Text>
                        <Checkbox label="używaj przewrotów" isChecked={tempEnabledThirteenthsInversions.length > 1} onClick={() => setTempEnabledThirteenthsInversions(tempEnabledThirteenthsInversions.length > 1 ? [0] : [0, 1, 2, 3])}/>
                    </FlexContainer>
                    <FlexContainer>
                        <Spacer length={0.5}/>
                        <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)}/>
                        <Spacer length={4}/>
                    </FlexContainer>
                </FlexContainer>
                <FlexContainer>
                    <NoteAdjustmentSliders/>
                </FlexContainer>
            </FlexContainer>
        </Overlay>
    );

}

export default Thirteenths;
