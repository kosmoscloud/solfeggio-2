import React, { useContext } from 'react';
import Button from '../button/Button';
import Header from '../header/Header';
import './style.css';
import { ExerciseContext } from '../../managers/ExercisesManager';

function QuizInput({ onResponseSelected }) {
    const enabledSeventhsInversions = useContext(ExerciseContext).enabledSeventhsInversions;

    return  <div className="quiz-input-inversions">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="Postać zas." onClick={() => onResponseSelected(0)} isEnabled={enabledSeventhsInversions.includes(0)} />
                        <Button label="Przewrót I" onClick={() => onResponseSelected(1)} isEnabled={enabledSeventhsInversions.includes(1)} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Button label="Przewrót II" onClick={() => onResponseSelected(2)} isEnabled={enabledSeventhsInversions.includes(2)} />
                        <Button label="Przewrót III" onClick={() => onResponseSelected(3)} isEnabled={enabledSeventhsInversions.includes(3)} />
                    </div>
                </div>
            </div>
}

export default QuizInput;
