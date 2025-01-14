import React, { useContext, useEffect, useState } from 'react';

import { GlobalSettingsContext } from '../../../managers/GlobalSettingsLayer';
import { UIContext } from '../../../managers/UILayer';

import Button from '../../../components/button/Button';
import Checkbox from '../../../components/checkbox/Checkbox';

import Table from '../../../components/table/Table';
import Column from '../../../components/table/column/Column';
import Text from '../../../components/text/Text';
import Spacer from '../../../components/spacer/Spacer';

import Overlay from '../Overlay';

function Elevenths() {
    const { hideOverlay } = useContext(UIContext); 
    const { enabledChords, setEnabledChordsByType } = useContext(GlobalSettingsContext);
    const { enabledInversions, setEnabledInversionsByType } = useContext(GlobalSettingsContext);
    const [ tempEnabledElevenths, setTempEnabledElevenths ] = useState(enabledChords['elevenths']);
    const [ tempEnabledEleventhsInversions, setTempEnabledEleventhsInversions ] = useState(enabledInversions['elevenths']);

    const acceptChanges = () => {
        if (tempEnabledElevenths === enabledChords['elevenths'] && tempEnabledEleventhsInversions === enabledInversions['elevenths']) {
            hideOverlay();
            return;
        }
        setEnabledChordsByType('elevenths', tempEnabledElevenths);
        setEnabledInversionsByType('elevenths', tempEnabledEleventhsInversions);
        hideOverlay();
    };

    const toggleEleventhChord = (type) => {
        if(tempEnabledElevenths.includes(type)) setTempEnabledElevenths(tempEnabledElevenths.filter(chord => chord !== type));
        else setTempEnabledElevenths([...tempEnabledElevenths, type]);
    }

    return (
        <Overlay>
            <Table>
                <Column>
                    <Text>Akordy z undecymą:</Text>
                    <Checkbox label="3w, 7w, 11cz" isChecked={tempEnabledElevenths.includes('3w7w11cz')} onClick={() => toggleEleventhChord('3w7w11cz')}/>
                    <Checkbox label="3w, 7m, 11cz" isChecked={tempEnabledElevenths.includes('3w7m11cz')} onClick={() => toggleEleventhChord('3w7m11cz')}/>
                    <Checkbox label="3m, 7w, 11cz" isChecked={tempEnabledElevenths.includes('3m7w11cz')} onClick={() => toggleEleventhChord('3m7w11cz')}/>
                    <Checkbox label="3m, 7m, 11cz" isChecked={tempEnabledElevenths.includes('3m7m11cz')} onClick={() => toggleEleventhChord('3m7m11cz')}/>
                </Column>
                <Column>
                    <Spacer length={1}/>
                    <Checkbox label="3w, 7w, 11zw" isChecked={tempEnabledElevenths.includes('3w7w11zw')} onClick={() => toggleEleventhChord('3w7w11zw')}/>
                    <Checkbox label="3w, 7m, 11zw" isChecked={tempEnabledElevenths.includes('3w7m11zw')} onClick={() => toggleEleventhChord('3w7m11zw')}/>
                    <Text>Przewroty</Text>
                    <Checkbox label="używaj przewrotów" isChecked={tempEnabledEleventhsInversions.length > 1} onClick={() => setTempEnabledEleventhsInversions(tempEnabledEleventhsInversions.length > 1 ? [0] : [0, 1, 2, 3])}/>
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

export default Elevenths;
