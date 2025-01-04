import Button from '../button/Button';
import Header from '../header/Header';
import Spacer from '../spacer/Spacer';
import './style.css';

function IntervalsInput({ onResponseSelected, enabledIntervals }) {

    return <div className="quiz-input-intervals">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="2m" onClick={() => onResponseSelected(1)} isEnabled={enabledIntervals.includes(1)} />
                        <Button label="3m" onClick={() => onResponseSelected(3)} isEnabled={enabledIntervals.includes(3)} />
                        <Spacer length={1} />
                        <Button label="5zm" onClick={() => onResponseSelected(6)} isEnabled={enabledIntervals.includes(6)} />
                        <Button label="6m" onClick={() => onResponseSelected(8)} isEnabled={enabledIntervals.includes(8)} />
                        <Button label="7m" onClick={() => onResponseSelected(10)} isEnabled={enabledIntervals.includes(10)} />
                        <Spacer length={1.5} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Spacer length={0.5} />
                        <Button label="2w" onClick={() => onResponseSelected(2)} isEnabled={enabledIntervals.includes(2)} />
                        <Button label="3w" onClick={() => onResponseSelected(4)} isEnabled={enabledIntervals.includes(4)} />
                        <Button label="4cz" onClick={() => onResponseSelected(5)} isEnabled={enabledIntervals.includes(5)} />
                        <Button label="5cz" onClick={() => onResponseSelected(7)} isEnabled={enabledIntervals.includes(7)} />
                        <Button label="6w" onClick={() => onResponseSelected(9)} isEnabled={enabledIntervals.includes(9)} />
                        <Button label="7w" onClick={() => onResponseSelected(11)} isEnabled={enabledIntervals.includes(11)} />
                        <Button label="8cz" onClick={() => onResponseSelected(12)} isEnabled={enabledIntervals.includes(12)} />
                    </div>
                </div>
            </div>
}

export default IntervalsInput;
