import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../managers/OverlaysManager';

import Button from '../../../components/button/Button';
import Checkbox from '../../../components/checkbox/Checkbox';

import Table from '../../../components/table/Table';
import Column from '../../../components/table/column/Column';
import Text from '../../../components/text/Text';
import Spacer from '../../../components/spacer/Spacer';

import Overlay from '../Overlay';

function Random() {
    const { hideOverlay } = useContext(OverlaysContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledRandomChords, setTempEnabledRandomChords ] = useState(enabledChords['random']);

    const acceptChanges = () => {
        if (tempEnabledRandomChords === enabledChords['random']) {
            hideOverlay();
            return;
        }
        setEnabledChordsByType('random', tempEnabledRandomChords);
        hideOverlay();
    };

    const toggleRandom = (type) => {
        if(tempEnabledRandomChords.includes(type)) setTempEnabledRandomChords(tempEnabledRandomChords.filter(chord => chord !== type));
        else setTempEnabledRandomChords([...tempEnabledRandomChords, type]);
    }

    return (
        <Overlay>
            <Table>
                <Column>
                    <Text>Akordy przypadkowe:</Text>
                    <Checkbox label="Dwudźwięk" isChecked={tempEnabledRandomChords.includes(2)} onClick={() => toggleRandom(2)}/>
                    <Checkbox label="Trójdźwięk" isChecked={tempEnabledRandomChords.includes(3)} onClick={() => toggleRandom(3)}/>
                    <Checkbox label="Czterodźwięk" isChecked={tempEnabledRandomChords.includes(4)} onClick={() => toggleRandom(4)}/>
                </Column>
                <Column>
                    <Spacer length={0.5}/>
                    <Button label="OK" onClick={acceptChanges}/>
                    <Button label="Anuluj" onClick={hideOverlay}/>
                    <Spacer length={3}/>
                </Column>
            </Table>
        </Overlay>
    );

}

export default Random;
