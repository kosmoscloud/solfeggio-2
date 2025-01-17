import React, { useContext, useState } from 'react';
import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { UIContext, LanguageContext } from '../../managers/UILayer';

import Button from '../../components/button/Button';
import Checkbox from '../../components/checkbox/Checkbox';
import Row from '../../components/table/row/Row';
import Column from '../../components/table/column/Column';
import Grid from '../../components/grid/Grid';
import Table from '../../components/table/Table';
import Text from '../../components/text/Text';
import Spacer from '../../components/spacer/Spacer';
import Slider from '../../components/slider/Slider';

import Overlay from './Overlay';


function Intervals({ sliderEnabled = false }) {
    const { hideOverlay, showAlert } = useContext(UIContext); 
    const { enabledIntervals, setEnabledIntervals } = useContext(GlobalSettingsContext);
    const { intervalsN, setIntervalsN } = useContext(GlobalSettingsContext);
    const [ tempIntervalsN, setTempIntervalsN ] = useState(intervalsN);
    const [ tempEnabledIntervals, setTempEnabledIntervals ] = useState(enabledIntervals);

    const { dictionary } = useContext(LanguageContext);

    const acceptChanges = () => {
        if (tempEnabledIntervals === enabledIntervals && tempIntervalsN === intervalsN) {
            hideOverlay();
            return;
        }
        if (tempEnabledIntervals.length === 0) {
            showAlert("Wybierz przynajmniej jeden interwał.");
            return;
        }
        setEnabledIntervals(tempEnabledIntervals);
        setIntervalsN(tempIntervalsN);
        hideOverlay();
    };

    const toggleInterval = (interval) => {
        if(tempEnabledIntervals.includes(interval)) setTempEnabledIntervals(tempEnabledIntervals.filter(intervalB => intervalB !== interval));
        else setTempEnabledIntervals([...tempEnabledIntervals, interval]);
    }

    return (
        <Overlay>
            <Table direction='column'>
                <Text center={false}>{dictionary.intervals}</Text>
                <Row>
                    <Grid dimx={2} padding={false}>
                        <Checkbox label={dictionary.minorsecond} isChecked={tempEnabledIntervals.includes(1)} onClick={() => toggleInterval(1)}/>
                        <Checkbox label={dictionary.majorsecond} isChecked={tempEnabledIntervals.includes(2)} onClick={() => toggleInterval(2)}/>
                        <Checkbox label={dictionary.minorthird} isChecked={tempEnabledIntervals.includes(3)} onClick={() => toggleInterval(3)}/>
                        <Checkbox label={dictionary.majorthird} isChecked={tempEnabledIntervals.includes(4)} onClick={() => toggleInterval(4)}/>
                        <Checkbox label={dictionary.perfectfourth} isChecked={tempEnabledIntervals.includes(5)} onClick={() => toggleInterval(5)}/>
                        <Checkbox label={dictionary.tritone} isChecked={tempEnabledIntervals.includes(6)} onClick={() => toggleInterval(6)}/>
                        <Checkbox label={dictionary.perfectfifth} isChecked={tempEnabledIntervals.includes(7)} onClick={() => toggleInterval(7)}/>
                        <Checkbox label={dictionary.minorsixth} isChecked={tempEnabledIntervals.includes(8)} onClick={() => toggleInterval(8)}/>
                        <Checkbox label={dictionary.majorsixth} isChecked={tempEnabledIntervals.includes(9)} onClick={() => toggleInterval(9)}/>
                        <Checkbox label={dictionary.minorseventh} isChecked={tempEnabledIntervals.includes(10)} onClick={() => toggleInterval(10)}/>
                        <Checkbox label={dictionary.majorseventh} isChecked={tempEnabledIntervals.includes(11)} onClick={() => toggleInterval(11)}/>
                        <Checkbox label={dictionary.octave} isChecked={tempEnabledIntervals.includes(12)} onClick={() => toggleInterval(12)}/>
                    </Grid>
                    <Row padding={false}>
                        {sliderEnabled && <Spacer length={0.5} />}
                        {sliderEnabled && <Text>Przykłady: </Text>}
                        {sliderEnabled && <Slider min={1} max={5} initialValue={tempIntervalsN} onChange={setTempIntervalsN}/> }
                        {!sliderEnabled && <Spacer length={3} />}
                        <Column>
                            <Button label={dictionary.ok} onClick={acceptChanges}/>
                            <Button label={dictionary.cancel} onClick={() => hideOverlay()}/>
                        </Column>
                    </Row>
                </Row>
            </Table>
        </Overlay>
    );

}

export default Intervals;
