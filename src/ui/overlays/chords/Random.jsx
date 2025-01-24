import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../../managers/GlobalSettingsLayer';
import { UIContext } from '../../../managers/UILayer';

import Button from '../../../components/button/Button';
import Checkbox from '../../../components/checkbox/Checkbox';

import Table from '../../../components/table/Table';
import Column from '../../../components/table/column/Column';
import Text from '../../../components/text/Text';
import Spacer from '../../../components/spacer/Spacer';

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
            <Table>
                <Column>
                    <Text>Akordy przypadkowe:</Text>
                    <Checkbox label="Dwudźwięk" isChecked={tempEnabledRandomChords.includes(2)} onClick={() => toggleRandom(2)}/>
                    <Checkbox label="Trójdźwięk" isChecked={tempEnabledRandomChords.includes(3)} onClick={() => toggleRandom(3)}/>
                    <Checkbox label="Czterodźwięk" isChecked={tempEnabledRandomChords.includes(4)} onClick={() => toggleRandom(4)}/>
                </Column>
                <Column>
                    <Spacer length={0.5}/>
                    <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)}/>
                    <Spacer length={3}/>
                </Column>
            </Table>
        </Overlay>
    );

}

export default Random;
