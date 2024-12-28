import React, { useContext } from 'react';
import Button from '../button/Button';
import Header from '../header/Header';
import Spacer from '../spacer/Spacer';
import './style.css';
import { ExerciseContext } from '../../managers/ExercisesManager';

function TriadsInversionsInput({ onResponseSelected }) {
    const { enabledTriadsInversions } = useContext(ExerciseContext);

    return <div className="quiz-input-inversions">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="Postać zas." onClick={() => onResponseSelected(0)} isEnabled={enabledTriadsInversions.includes(0)} />
                        <Button label="Przewrót I" onClick={() => onResponseSelected(1)} isEnabled={enabledTriadsInversions.includes(1)} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Spacer length={0.5} />
                        <Button label="Przewrót II" onClick={() => onResponseSelected(2)} isEnabled={enabledTriadsInversions.includes(2)} />
                        <Spacer length={0.5} />
                    </div>
                </div>
            </div>
}

export default TriadsInversionsInput;
