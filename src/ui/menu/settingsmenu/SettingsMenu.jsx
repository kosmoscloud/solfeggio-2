import React, { useContext } from 'react';

import { UIContext } from '../../../managers/UILayer.jsx';

import MainMenu from '../mainmenu/MainMenu.jsx';

import Ranges from '../../overlays/Ranges.jsx';
import AudioMIDISettings from '../../overlays/AudioMIDISettings.jsx';
import SelectInstruments from '../../overlays/SelectInstruments.jsx';

import MenuOption from '../../../components/menuoption/MenuOption.jsx';
import Overlay from '../../overlays/Overlay.jsx';
import Table from '../../../components/table/Table.jsx';
import Column from '../../../components/table/column/Column.jsx';

function SettingsMenu() {

    const { showElement } = useContext(UIContext);

    return (
        <Overlay minWidth="20%">
            <Column alignItems="center">
                <Table>
                    <Column>
                        <MenuOption label="zakres i skala muzyczna" onClick={() => showElement(<Ranges />)}/>
                        <MenuOption label="powrót" onClick={() => showElement(<MainMenu />)}/>
                    </Column>
                    <Column>
                        <MenuOption label="instrumenty" onClick={() => showElement(<SelectInstruments />)}/>
                        <MenuOption label="audio/midi" onClick={() => showElement(<AudioMIDISettings />)}/>
                    </Column>
                </Table>
            </Column>
        </Overlay>
    )

}

export default SettingsMenu;