import React, { useContext } from 'react';

import { LanguageContext, UIContext } from '../../../managers/UILayer.jsx';

import MainMenu from '../mainmenu/MainMenu.jsx';

import Ranges from '../../overlays/Ranges.jsx';
import AudioMIDISettings from '../../overlays/AudioMIDISettings.jsx';
import SelectInstruments from '../../overlays/SelectInstruments.jsx';

import MenuOption from '../../../components/menuoption/MenuOption.jsx';
import Overlay from '../../overlays/Overlay.jsx';
import Grid from '../../../components/grid/Grid.jsx';

function SettingsMenu() {

    const { showElement, aspectRatio } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);
    const dimx = aspectRatio >= 1.25 ? 2 : 1;

    return (
        <Overlay minWidth="20%">
            <Grid dimx={dimx}>
                <MenuOption label={dictionary.rangeandscale} onClick={() => showElement(<Ranges />)}/>
                <MenuOption label={dictionary.instruments} onClick={() => showElement(<SelectInstruments />)}/>
                <MenuOption label={dictionary.back} onClick={() => showElement(<MainMenu />)}/>
                <MenuOption label={dictionary.audiomidi} onClick={() => showElement(<AudioMIDISettings />)}/>
            </Grid>
        </Overlay>
    )

}

export default SettingsMenu;