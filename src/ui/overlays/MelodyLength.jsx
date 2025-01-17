import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { LanguageContext, UIContext } from '../../managers/UILayer';

import Button from '../../components/button/Button';
import Column from '../../components/table/column/Column';
import Slider from '../../components/slider/Slider';
import Text from '../../components/text/Text';
import Spacer from '../../components/spacer/Spacer';
import Select from "../../components/select/Select"
import Table from '../../components/table/Table';

import Overlay from './Overlay';

function MelodyLength() {
    const { hideOverlay } = useContext(UIContext); 
    const { melodyLength, setMelodyLength } = useContext(GlobalSettingsContext);
    const [ tempMelodyLength, setTempMelodyLength ] = useState(melodyLength);
    const { melodyType, setMelodyType } = useContext(GlobalSettingsContext);
    const [ tempMelodyType, setTempMelodyType ] = useState(melodyType);

    const { dictionary } = useContext(LanguageContext);

    const acceptChanges = () => {
        setMelodyLength(tempMelodyLength);
        setMelodyType(tempMelodyType);
        hideOverlay();
    };

    return (
        <Overlay>
            <Table>
                <Column>
                    <Text>{dictionary.melodytype}</Text>
                    <Select value={tempMelodyType} onChange={e => setTempMelodyType(e.target.value)}>
                        <option value="ascending">{dictionary.ascending}</option>
                        <option value="descending">{dictionary.descending}</option>
                        <option value="random">{dictionary.free}</option>
                    </Select>
                    <Text>{dictionary.length}</Text>
                    <Slider initialValue={tempMelodyLength} onChange={setTempMelodyLength} min={3} max={10}/>
                </Column>
                <Column width={0.5}>
                    <Button label={dictionary.ok} onClick={acceptChanges}/>
                    <Button label={dictionary.cancel} onClick={hideOverlay}/>
                    <Spacer length={1}/>
                </Column>
            </Table>
        </Overlay> 
    );
}

export default MelodyLength;
