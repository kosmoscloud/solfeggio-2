import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { LanguageContext, UIContext } from '../../managers/UILayer';

import Column from '../../components/table/column/Column';
import Slider from '../../components/slider/Slider';
import Text from '../../components/text/Text';
import Spacer from '../../components/spacer/Spacer';
import Select from "../../components/select/Select"
import Table from '../../components/table/Table';

import Overlay from './Overlay';
import OKCancel from './okcancel/OKCancel';
import NoteAdjustmentSliders from './noteadjustmentsliders/NoteAdjustmentSliders';

import MelodyType from '../../managers/enums/MelodyType';

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
        <Overlay>
            <Table>
                <Column>
                    <Text>{dictionary.melodytype}</Text>
                    <Select value={tempMelodyType} onChange={e => setTempMelodyType(e.target.value)}>
                        <option value={MelodyType.ASCENDING}>{dictionary.ascending}</option>
                        <option value={MelodyType.DESCENDING}>{dictionary.descending}</option>
                        <option value={MelodyType.FREE}>{dictionary.free}</option>
                    </Select>
                    <Slider text={dictionary.melodylength} value={tempMelodyLength} onChange={setTempMelodyLength} min={3} max={10}/>
                <NoteAdjustmentSliders/>
                </Column>
                <Column width={0.5}>
                    <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)}/>
                    <Spacer length={2}/>
                </Column>
            </Table>
        </Overlay> 
    );
}

export default MelodyLength;
