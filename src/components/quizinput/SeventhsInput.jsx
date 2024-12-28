import React, { useContext } from 'react';
import Button from '../button/Button';
import Header from '../header/Header';
import './style.css';
import { ExerciseContext } from '../../managers/ExercisesManager';

function SeventhsInput({ onResponseSelected }) {
    const { enabledSevenths } = useContext(ExerciseContext);
    return  <div className="quiz-input-sevenths">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="Durowy 7w" onClick={() => onResponseSelected('maj7')} isEnabled={enabledSevenths.includes('maj7')} />
                        <Button label="Dominantowy" onClick={() => onResponseSelected('dom7')} isEnabled={enabledSevenths.includes('dom7')} />
                        <Button label="Molowy 7m" onClick={() => onResponseSelected('min7')} isEnabled={enabledSevenths.includes('min7')} />
                        <Button label="Półzmniejszony" onClick={() => onResponseSelected('min7b5')} isEnabled={enabledSevenths.includes('min7b5')} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Button label="Molowy 7w" onClick={() => onResponseSelected('minmaj7')} isEnabled={enabledSevenths.includes('minmaj7')} />
                        <Button label="Zmniejszony" onClick={() => onResponseSelected('dim7')} isEnabled={enabledSevenths.includes('dim7')} />
                        <Button label="Zwiększony" onClick={() => onResponseSelected('aug7')} isEnabled={enabledSevenths.includes('aug7')} />
                        <Button label="Zwiększony 7w" onClick={() => onResponseSelected('augmaj7')} isEnabled={enabledSevenths.includes('augmaj7')} />
                    </div>
                </div>
            </div>
}

export default SeventhsInput;
