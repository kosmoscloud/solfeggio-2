import React, { useContext, useState } from 'react';
import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { UIContext } from '../../managers/UILayer';

import Button from '../../components/button/Button';
import Checkbox from '../../components/checkbox/Checkbox';
import Table from '../../components/table/Table';
import Column from '../../components/table/column/Column';
import Text from '../../components/text/Text';
import Spacer from '../../components/spacer/Spacer';
import Stepper from '../../components/stepper/Stepper';

import Overlay from './Overlay';


function Intervals({ stepperEnabled = false }) {
    const { hideOverlay, showAlert } = useContext(UIContext); 
    const { enabledIntervals, setEnabledIntervals } = useContext(GlobalSettingsContext);
    const { intervalsN, setIntervalsN } = useContext(GlobalSettingsContext);
    const [ tempIntervalsN, setTempIntervalsN ] = useState(intervalsN);
    const [ tempEnabledIntervals, setTempEnabledIntervals ] = useState(enabledIntervals);

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
            <Table>
                <Column>
                    <Text>Interwały:</Text>
                    <Checkbox label="2m" isChecked={tempEnabledIntervals.includes(1)} onClick={() => toggleInterval(1)}/>
                    <Checkbox label="2w" isChecked={tempEnabledIntervals.includes(2)} onClick={() => toggleInterval(2)}/>
                    <Checkbox label="3m" isChecked={tempEnabledIntervals.includes(3)} onClick={() => toggleInterval(3)}/>
                    <Checkbox label="3w" isChecked={tempEnabledIntervals.includes(4)} onClick={() => toggleInterval(4)}/>
                </Column>
                <Column>
                    <Spacer length={1}/>
                    <Checkbox label="4cz" isChecked={tempEnabledIntervals.includes(5)} onClick={() => toggleInterval(5)}/>
                    <Checkbox label="5zm" isChecked={tempEnabledIntervals.includes(6)} onClick={() => toggleInterval(6)}/>
                    <Checkbox label="5cz" isChecked={tempEnabledIntervals.includes(7)} onClick={() => toggleInterval(7)}/>
                    <Checkbox label="6m" isChecked={tempEnabledIntervals.includes(8)} onClick={() => toggleInterval(8)}/>
                </Column>
                <Column>
                    <Spacer length={1}/>
                    <Checkbox label="6w" isChecked={tempEnabledIntervals.includes(9)} onClick={() => toggleInterval(9)}/>
                    <Checkbox label="7m" isChecked={tempEnabledIntervals.includes(10)} onClick={() => toggleInterval(10)}/>
                    <Checkbox label="7w" isChecked={tempEnabledIntervals.includes(11)} onClick={() => toggleInterval(11)}/>
                    <Checkbox label="8cz" isChecked={tempEnabledIntervals.includes(12)} onClick={() => toggleInterval(12)}/>
                </Column>
                <Column width={0.75}>
                    <Spacer length={0.5}/>
                    <Button label="OK" onClick={acceptChanges}/>
                    <Button label="Anuluj" onClick={() => hideOverlay()}/>
                    {stepperEnabled && <Spacer length={0.5} />}
                    {stepperEnabled && <Text>przykłady: </Text>}
                    {stepperEnabled && <Stepper text='liczba przykładów (quiz)' min={1} max={5} initialValue={tempIntervalsN} onChange={setTempIntervalsN}/> }
                    {!stepperEnabled && <Spacer length={2} />}
                </Column>
            </Table>
        </Overlay>
    );

}

export default Intervals;
