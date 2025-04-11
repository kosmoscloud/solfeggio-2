import React, { useContext, useState } from 'react';
import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { UIContext, LanguageContext } from '../../layers/UILayer';

import Checkbox from '../../components/Checkbox';
import FlexContainer from '../../components/FlexContainer';
import Grid from '../../components/Grid';
import Text from '../../components/Text';
import Slider from '../../components/Slider';

import Overlay from './Overlay';
import OKCancel from './okcancel/OKCancel';

import ReproductionMode from '../../layers/enums/ReproductionMode';
import { IOContext } from '../../layers/IOLayer';

function Intervals() {
    const { showElement, lastOpenedElement, showAlert, hideAlert } = useContext(UIContext); 
    const { enabledIntervals, setEnabledIntervals } = useContext(GlobalSettingsContext);
    const { intervalsN, setIntervalsN } = useContext(GlobalSettingsContext);
    const { reproductionMode, setReproductionMode } = useContext(IOContext);
    const [ tempIntervalsN, setTempIntervalsN ] = useState(intervalsN);
    const [ tempEnabledIntervals, setTempEnabledIntervals ] = useState(enabledIntervals);
    const [ tempReproductionMode, setTempReproductionMode ] = useState(reproductionMode);

    const { dictionary } = useContext(LanguageContext);

    const acceptChanges = () => {
        if (tempEnabledIntervals === enabledIntervals && tempIntervalsN === intervalsN && tempReproductionMode === reproductionMode) {
            showElement(lastOpenedElement);
            return;
        }
        if (tempEnabledIntervals.length === 0) {
            showAlert(dictionary.selectatleastoneinterval);
            return;
        }
        if (tempReproductionMode === ReproductionMode.RANDOM) {
            setTempIntervalsN(1);
        }
        setReproductionMode(tempReproductionMode);
        setEnabledIntervals(tempEnabledIntervals);
        setIntervalsN(tempIntervalsN);
        hideAlert();
        showElement(lastOpenedElement);
    };

    const toggleInterval = (interval) => {
        if(tempEnabledIntervals.includes(interval)) setTempEnabledIntervals(tempEnabledIntervals.filter(intervalB => intervalB !== interval));
        else setTempEnabledIntervals([...tempEnabledIntervals, interval]);
    }

    return (
        <div>
            <Overlay minHeight={tempReproductionMode === ReproductionMode.SIMULTANEOUS ? '50%' : '40%'} minWidth='50%'>
                <FlexContainer direction='row'>
                    <FlexContainer>
                        <FlexContainer direction='row' gap={5} length={5}>
                            <FlexContainer length={2}>
                                <Text center={false}>{dictionary.intervals}</Text>
                                <Grid dimx={3} dimy={4} padding={false} flex={4}>
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
                            </FlexContainer>
                            <FlexContainer>
                                <Text center={false}>{dictionary.intervalplayingmode}</Text>
                                <Grid dimx={2} dimy={1} padding={false} flex={4}>
                                    <Grid dimx={1} dimy={4} padding={false}>
                                        <Checkbox label={dictionary.simultaneousmode} isChecked={tempReproductionMode === ReproductionMode.SIMULTANEOUS} onClick={() => {setTempReproductionMode(ReproductionMode.SIMULTANEOUS)}}/>
                                        <Checkbox label={dictionary.ascendingmode} isChecked={tempReproductionMode === ReproductionMode.ASCENDING} onClick={() => {setTempReproductionMode(ReproductionMode.ASCENDING); setTempIntervalsN(1)}}/>
                                        <Checkbox label={dictionary.descendingmode} isChecked={tempReproductionMode === ReproductionMode.DESCENDING} onClick={() => {setTempReproductionMode(ReproductionMode.DESCENDING); setTempIntervalsN(1)}}/>
                                        <Checkbox label={dictionary.randommode} isChecked={tempReproductionMode === ReproductionMode.RANDOM} onClick={() => {setTempReproductionMode(ReproductionMode.RANDOM); setTempIntervalsN(1)}}/>
                                    </Grid>
                                </Grid>
                            </FlexContainer>
                        </FlexContainer>
                        {tempReproductionMode === ReproductionMode.SIMULTANEOUS && <FlexContainer length={0.5} direction='row' padding={false}>
                            <FlexContainer>
                                <Text>{dictionary.numberofexamples}</Text>
                            </FlexContainer>
                            <FlexContainer length={2}>
                                <Slider label={dictionary.intervalsn} min={1} max={5} value={tempIntervalsN} onChange={setTempIntervalsN}/>
                            </FlexContainer>
                        </FlexContainer>}
                    </FlexContainer>
                </FlexContainer>
            </Overlay>
            <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)} top={tempReproductionMode === ReproductionMode.SIMULTANEOUS ? '85%' : '80%'}/>
        </div>
    );

}

export default Intervals;
