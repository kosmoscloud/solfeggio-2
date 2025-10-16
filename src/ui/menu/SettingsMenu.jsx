import React, { useContext, useMemo } from 'react';

import { LanguageContext, UIContext } from '../../layers/UILayer.jsx';

import MainMenu from './MainMenu.jsx';

import Ranges from '../overlays/Ranges.jsx';
import AudioMIDISettings from '../overlays/AudioMIDISettings.jsx';
import SelectInstruments from '../overlays/SelectInstruments.jsx';

import Button from '../../components/Button.jsx';
import Overlay from '../overlays/Overlay.jsx';
import Grid from '../../components/Grid.jsx';
import GridPositioner from '../../components/GridPositioner.jsx';

function SettingsMenu() {

    const { showElement, aspectRatio } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);
    
    const dimensions = useMemo(() => {
        const dimx = aspectRatio >= 1.25 ? 1 : 1
        const dimy = aspectRatio >= 1.25 ? 2 : 4
        return { dimx, dimy };
    }, [aspectRatio]);

    const { dimx, dimy } = dimensions;      

    return (
        <Overlay minWidth="20%" minHeight="25%">
            <Grid dimx={dimx} dimy={dimy}>
                <Button label={dictionary.rangeandscale} onClick={() => showElement(<Ranges />)}/>
                {/* <Button label={dictionary.instruments} onClick={() => showElement(<SelectInstruments />)}/> */}
                <GridPositioner x={1} y={dimy}>
                    <Button label={dictionary.back} onClick={() => showElement(<MainMenu />)}/>
                </GridPositioner>
                {/* <Button label={dictionary.audiomidi} onClick={() => showElement(<AudioMIDISettings />)}/> */}
            </Grid>
        </Overlay>
    )

}

export default SettingsMenu;