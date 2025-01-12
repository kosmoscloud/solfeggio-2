import { useContext } from 'react';

import { IOContext } from '../../managers/IOManager';
import { GlobalSettingsContext } from '../../managers/GlobalSettingsManager';

import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import Spacer from '../../components/spacer/Spacer';

import './style.css';

function IntervalsInput() {

    const triggerLastAnswer = useContext(IOContext).triggerLastAnswer;
    const enabledIntervals = useContext(GlobalSettingsContext).enabledIntervals;

    return <div className="quiz-input-intervals">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="2m" onClick={() => triggerLastAnswer(1)} isEnabled={enabledIntervals.includes(1)} />
                        <Button label="3m" onClick={() => triggerLastAnswer(3)} isEnabled={enabledIntervals.includes(3)} />
                        <Spacer length={1} />
                        <Button label="5zm" onClick={() => triggerLastAnswer(6)} isEnabled={enabledIntervals.includes(6)} />
                        <Button label="6m" onClick={() => triggerLastAnswer(8)} isEnabled={enabledIntervals.includes(8)} />
                        <Button label="7m" onClick={() => triggerLastAnswer(10)} isEnabled={enabledIntervals.includes(10)} />
                        <Spacer length={1.5} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Spacer length={0.5} />
                        <Button label="2w" onClick={() => triggerLastAnswer(2)} isEnabled={enabledIntervals.includes(2)} />
                        <Button label="3w" onClick={() => triggerLastAnswer(4)} isEnabled={enabledIntervals.includes(4)} />
                        <Button label="4cz" onClick={() => triggerLastAnswer(5)} isEnabled={enabledIntervals.includes(5)} />
                        <Button label="5cz" onClick={() => triggerLastAnswer(7)} isEnabled={enabledIntervals.includes(7)} />
                        <Button label="6w" onClick={() => triggerLastAnswer(9)} isEnabled={enabledIntervals.includes(9)} />
                        <Button label="7w" onClick={() => triggerLastAnswer(11)} isEnabled={enabledIntervals.includes(11)} />
                        <Button label="8cz" onClick={() => triggerLastAnswer(12)} isEnabled={enabledIntervals.includes(12)} />
                    </div>
                </div>
            </div>
}

export default IntervalsInput;
