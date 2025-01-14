import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { UIContext } from '../../managers/UILayer';

import Button from '../../components/button/Button';
import Column from '../../components/table/column/Column';
import Stepper from '../../components/stepper/Stepper';
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

    const acceptChanges = () => {
        setMelodyLength(tempMelodyLength);
        setMelodyType(tempMelodyType);
        hideOverlay();
    };

    return (
        <Overlay>
            <Table>
                <Column>
                    <Text>Typ melodii</Text>
                    <Select value={tempMelodyType} onChange={e => setTempMelodyType(e.target.value)}>
                        <option value="ascending">rosnąca</option>
                        <option value="descending">opadająca</option>
                        <option value="random">swobodna</option>
                    </Select>
                    <Text>Długość</Text>
                    <Stepper initialValue={tempMelodyLength} onChange={setTempMelodyLength} min={3} max={10}/>
                </Column>
                <Column width={0.5}>
                    <Button label="OK" onClick={acceptChanges}/>
                    <Button label="Anuluj" onClick={hideOverlay}/>
                    <Spacer length={1}/>
                </Column>
            </Table>
        </Overlay> 
    );
}

export default MelodyLength;
