import Button from '../button/Button';
import Header from '../header/Header';
import Spacer from '../spacer/Spacer';
import './style.css';

function IntervalsInput({ onResponseSelected }) {

    return <div className="quiz-input-intervals">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="2m" onClick={() => onResponseSelected(1)} />
                        <Button label="3m" onClick={() => onResponseSelected(3)} />
                        <Spacer length={1} />
                        <Button label="5zm" onClick={() => onResponseSelected(6)} />
                        <Button label="6m" onClick={() => onResponseSelected(8)} />
                        <Button label="7m" onClick={() => onResponseSelected(10)} />
                        <Spacer length={1.5} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Spacer length={0.5} />
                        <Button label="2w" onClick={() => onResponseSelected(2)} />
                        <Button label="3w" onClick={() => onResponseSelected(4)} />
                        <Button label="4cz" onClick={() => onResponseSelected(5)} />
                        <Button label="5cz" onClick={() => onResponseSelected(7)} />
                        <Button label="6w" onClick={() => onResponseSelected(9)} />
                        <Button label="7w" onClick={() => onResponseSelected(11)} />
                        <Button label="8cz" onClick={() => onResponseSelected(12)} />
                    </div>
                </div>
            </div>
}

export default IntervalsInput;
