import React, { useContext, useMemo } from 'react';

import { LanguageContext, UIContext } from '../../../managers/UILayer.jsx';

import MainMenu from '../mainmenu/MainMenu.jsx';

import Ranges from '../../overlays/Ranges.jsx';
import AudioMIDISettings from '../../overlays/AudioMIDISettings.jsx';
import SelectInstruments from '../../overlays/SelectInstruments.jsx';

import MenuOption from '../../../components/menuoption/MenuOption.jsx';
import Overlay from '../../overlays/Overlay.jsx';
import Grid from '../../../components/grid/Grid.jsx';
import GridPositioner from '../../../components/grid/gridpositioner/GridPositioner.jsx';

function SettingsMenu() {

    const { showElement, aspectRatio } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);
    
    const dimensions = useMemo(() => {
        const dimx = aspectRatio >= 1.25 ? 2 : 1
        const dimy = aspectRatio >= 1.25 ? 2 : 4
        return { dimx, dimy };
    }, [aspectRatio]);

    const { dimx, dimy } = dimensions;      

    return (
        <Overlay minWidth="20%">
            <Grid dimx={dimx} dimy={dimy}>
                <MenuOption label={dictionary.rangeandscale} onClick={() => showElement(<Ranges />)}/>
                <MenuOption label={dictionary.instruments} onClick={() => showElement(<SelectInstruments />)}/>
                <GridPositioner x={1} y={dimy}>
                    <MenuOption label={dictionary.back} onClick={() => showElement(<MainMenu />)}/>
                </GridPositioner>
                <MenuOption label={dictionary.audiomidi} onClick={() => showElement(<AudioMIDISettings />)}/>
            </Grid>
        </Overlay>
    )

}

export default SettingsMenu;