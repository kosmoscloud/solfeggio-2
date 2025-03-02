import { useContext } from 'react';

import { IOContext } from '../../layers/IOLayer';
import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { LanguageContext } from '../../layers/UILayer';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Spacer from '../../components/FlexContainer';

import './style.css';

function IntervalsInput() {

    const triggerLastAnswer = useContext(IOContext).triggerLastAnswer;
    const enabledIntervals = useContext(GlobalSettingsContext).enabledIntervals;
    const { dictionary } = useContext(LanguageContext);

    const containerstyle = {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '15%',
        left: '10%',
        height: '35%',
        width: '80%',
        gap: '8%'
    };

    return <div style={containerstyle}>
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
