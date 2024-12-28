import React, { useContext } from 'react';
import Button from '../button/Button';
import Header from '../header/Header';
import './style.css';
import { ExerciseContext } from '../../managers/ExercisesManager';

function TriadsInput({ onResponseSelected }) {
    const { enabledTriads } = useContext(ExerciseContext);

    return  <div className="quiz-input-triads">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="Durowy" onClick={() => onResponseSelected('maj')} isEnabled={enabledTriads.includes('maj')} />
                        <Button label="Molowy" onClick={() => onResponseSelected('min')} isEnabled={enabledTriads.includes('min')} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Button label="Zmniejszony" onClick={() => onResponseSelected('dim')} isEnabled={enabledTriads.includes('dim')} />
                        <Button label="Zwiększony" onClick={() => onResponseSelected('aug')} isEnabled={enabledTriads.includes('aug')} />
                    </div>
                </div>
            </div>
}

export default TriadsInput;
