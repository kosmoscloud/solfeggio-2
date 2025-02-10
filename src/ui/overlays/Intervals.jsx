import React, { useContext, useState } from 'react';
import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { UIContext, LanguageContext } from '../../managers/UILayer';

import Checkbox from '../../components/Checkbox';
import FlexContainer from '../../components/FlexContainer';
import Grid from '../../components/Grid';
import Text from '../../components/Text';
import Spacer from '../../components/FlexContainer';
import Slider from '../../components/Slider';

import Overlay from './Overlay';
import OKCancel from './okcancel/OKCancel';

import IntervalPlayingMode from '../../managers/enums/IntervalPlayingMode';
import NoteAdjustmentSliders from './noteadjustmentsliders/NoteAdjustmentSliders';

function Intervals({ sliderEnabled = false }) {
    const { showElement, lastOpenedElement, showAlert } = useContext(UIContext); 
    const { enabledIntervals, setEnabledIntervals } = useContext(GlobalSettingsContext);
    const { intervalsN, setIntervalsN } = useContext(GlobalSettingsContext);
    const { intervalPlayingMode, setIntervalPlayingMode } = useContext(GlobalSettingsContext);
    const [ tempIntervalsN, setTempIntervalsN ] = useState(intervalsN);
    const [ tempEnabledIntervals, setTempEnabledIntervals ] = useState(enabledIntervals);
    const [ tempIntervalPlayingMode, setTempIntervalPlayingMode ] = useState(intervalPlayingMode);

    const { dictionary } = useContext(LanguageContext);

    const acceptChanges = () => {
        if (tempEnabledIntervals === enabledIntervals && tempIntervalsN === intervalsN && tempIntervalPlayingMode === intervalPlayingMode) {
            showElement(lastOpenedElement);
            return;
        }
        if (tempEnabledIntervals.length === 0) {
            showAlert("Wybierz przynajmniej jeden interwał.");
            return;
        }
        setIntervalPlayingMode(tempIntervalPlayingMode);
        setEnabledIntervals(tempEnabledIntervals);
        setIntervalsN(tempIntervalsN);
        showElement(lastOpenedElement);
    };

    const toggleInterval = (interval) => {
        if(tempEnabledIntervals.includes(interval)) setTempEnabledIntervals(tempEnabledIntervals.filter(intervalB => intervalB !== interval));
        else setTempEnabledIntervals([...tempEnabledIntervals, interval]);
    }

    return (
        <Overlay>
            <FlexContainer>
                <FlexContainer direction='row'>
                    <Text center={false}>{dictionary.intervals}</Text>
                    <Text center={false}>{dictionary.intervalplayingmode}</Text>
                </FlexContainer>
                <Grid dimx={2} dimy={1} alignItems='flex-start'>
                    <Grid dimx={3} dimy={4} padding={false}>
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
                    <Grid dimx={2} dimy={1} padding={false}>
                        <Grid dimx={1} dimy={4} padding={false}>
                            <Checkbox label={dictionary.simultaneousmode} isChecked={tempIntervalPlayingMode === IntervalPlayingMode.SIMULTANEOUS} onClick={() => {setTempIntervalPlayingMode(IntervalPlayingMode.SIMULTANEOUS)}}/>
                            <Checkbox label={dictionary.ascendingmode} isChecked={tempIntervalPlayingMode === IntervalPlayingMode.SEQUENTIAL_ASCENDING} onClick={() => {setTempIntervalPlayingMode(IntervalPlayingMode.SEQUENTIAL_ASCENDING); setTempIntervalsN(1)}}/>
                            <Checkbox label={dictionary.descendingmode} isChecked={tempIntervalPlayingMode === IntervalPlayingMode.SEQUENTIAL_DESCENDING} onClick={() => {setTempIntervalPlayingMode(IntervalPlayingMode.SEQUENTIAL_DESCENDING); setTempIntervalsN(1)}}/>
                            <Checkbox label={dictionary.randommode} isChecked={tempIntervalPlayingMode === IntervalPlayingMode.RANDOM} onClick={() => {setTempIntervalPlayingMode(IntervalPlayingMode.RANDOM); setTempIntervalsN(1)}}/>
                        </Grid>
                        <FlexContainer>
                            <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)}/>
                            {sliderEnabled && <Spacer length={0.5} />}
                            {sliderEnabled && <Text>Przykłady: </Text>}
                            {sliderEnabled && <Slider min={1} max={5} value={tempIntervalsN} onChange={setTempIntervalsN} isEnabled={tempIntervalPlayingMode === IntervalPlayingMode.SIMULTANEOUS}/> }
                            {sliderEnabled && <Spacer length={1} />}
                            {!sliderEnabled && <Spacer length={1} />}
                        </FlexContainer>
                    </Grid>
                </Grid>
                <FlexContainer direction='row'>
                    <NoteAdjustmentSliders/>
                </FlexContainer>
            </FlexContainer>
        </Overlay>
    );

}

export default Intervals;
