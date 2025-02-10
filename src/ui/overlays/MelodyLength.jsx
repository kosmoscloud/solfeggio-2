import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { LanguageContext, UIContext } from '../../layers/UILayer';

import Slider from '../../components/Slider';
import Text from '../../components/Text';
import Spacer from '../../components/FlexContainer';
import Select from "../../components/Select"
import FlexContainer from '../../components/FlexContainer';

import Overlay from './Overlay';
import OKCancel from './okcancel/OKCancel';
import NoteAdjustmentSliders from './noteadjustmentsliders/NoteAdjustmentSliders';

import MelodyType from '../../layers/enums/MelodyType';

function MelodyLength() {
    const { showElement, lastOpenedElement } = useContext(UIContext); 
    const { melodyLength, setMelodyLength } = useContext(GlobalSettingsContext);
    const [ tempMelodyLength, setTempMelodyLength ] = useState(melodyLength);
    const { melodyType, setMelodyType } = useContext(GlobalSettingsContext);
    const [ tempMelodyType, setTempMelodyType ] = useState(melodyType);

    const { dictionary } = useContext(LanguageContext);

    const acceptChanges = () => {
        setMelodyLength(tempMelodyLength);
        setMelodyType(tempMelodyType);
        showElement(lastOpenedElement);
    };

    return (
        <Overlay minWidth="30%" minHeight="20%">
            <FlexContainer direction='row'>
                <FlexContainer length={3}>
                    <Text>{dictionary.melodytype}</Text>
                    <Select value={tempMelodyType} onChange={e => setTempMelodyType(e.target.value)}>
                        <option value={MelodyType.ASCENDING}>{dictionary.ascending}</option>
                        <option value={MelodyType.DESCENDING}>{dictionary.descending}</option>
                        <option value={MelodyType.FREE}>{dictionary.free}</option>
                    </Select>
                    <Slider text={dictionary.melodylength} value={tempMelodyLength} onChange={setTempMelodyLength} min={3} max={10}/>
                <NoteAdjustmentSliders/>
                </FlexContainer>
                <FlexContainer>
                    <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)}/>
                    <Spacer length={2}/>
                </FlexContainer>
            </FlexContainer>
        </Overlay> 
    );
}

export default MelodyLength;
