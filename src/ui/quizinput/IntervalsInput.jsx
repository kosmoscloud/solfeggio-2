import { useContext } from 'react';

import { IOContext } from '../../layers/IOLayer';
import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { LanguageContext } from '../../layers/UILayer';

import Button from '../../components/Button';
import Spacer from '../../components/FlexContainer';

import './style.css';

function IntervalsInput() {

    const triggerLastInput = useContext(IOContext).triggerLastInput;
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
                        <Button label={dictionary.minorsecond} onClick={() => triggerLastInput(1)} isEnabled={enabledIntervals.includes(1)} />
                        <Button label={dictionary.minorthird} onClick={() => triggerLastInput(3)} isEnabled={enabledIntervals.includes(3)} />
                        <Spacer length={1} />
                        <Button label={dictionary.tritone} onClick={() => triggerLastInput(6)} isEnabled={enabledIntervals.includes(6)} />
                        <Button label={dictionary.minorsixth} onClick={() => triggerLastInput(8)} isEnabled={enabledIntervals.includes(8)} />
                        <Button label={dictionary.minorseventh} onClick={() => triggerLastInput(10)} isEnabled={enabledIntervals.includes(10)} />
                        <Spacer length={1.5} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Spacer length={0.5} />
                        <Button label={dictionary.majorsecond} onClick={() => triggerLastInput(2)} isEnabled={enabledIntervals.includes(2)} />
                        <Button label={dictionary.majorthird} onClick={() => triggerLastInput(4)} isEnabled={enabledIntervals.includes(4)} />
                        <Button label={dictionary.perfectfourth} onClick={() => triggerLastInput(5)} isEnabled={enabledIntervals.includes(5)} />
                        <Button label={dictionary.perfectfifth} onClick={() => triggerLastInput(7)} isEnabled={enabledIntervals.includes(7)} />
                        <Button label={dictionary.majorsixth} onClick={() => triggerLastInput(9)} isEnabled={enabledIntervals.includes(9)} />
                        <Button label={dictionary.majorseventh} onClick={() => triggerLastInput(11)} isEnabled={enabledIntervals.includes(11)} />
                        <Button label={dictionary.octave} onClick={() => triggerLastInput(12)} isEnabled={enabledIntervals.includes(12)} />
                    </div>
                </div>
            </div>
}

export default IntervalsInput;
