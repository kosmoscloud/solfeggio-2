import React from 'react';
import Button from '../button/Button';
import Header from '../header/Header';
import Spacer from '../spacer/Spacer';
import './style.css';

function QuizInput({ layout, onResponseSelected }) {
    const inputs = {
        intervals: (
            <div className="quiz-input-intervals">
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
        ),
        triads: (
            <div className="quiz-input-triads">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="Durowy" onClick={() => onResponseSelected('maj')} />
                        <Button label="Molowy" onClick={() => onResponseSelected('min')} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Button label="Zmniejszony" onClick={() => onResponseSelected('dim')} />
                        <Button label="Zwiększony" onClick={() => onResponseSelected('aug')} />
                    </div>
                </div>
            </div>
        ),
        sevenths: (
            <div className="quiz-input-sevenths">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="Durowy 7w" onClick={() => onResponseSelected('maj7')} />
                        <Button label="Dominantowy" onClick={() => onResponseSelected('dom7')} />
                        <Button label="Molowy 7m" onClick={() => onResponseSelected('min7')} />
                        <Button label="Półzmniejszony" onClick={() => onResponseSelected('min7b5')} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Button label="Molowy 7w" onClick={() => onResponseSelected('minmaj7')} />
                        <Button label="Zmniejszony" onClick={() => onResponseSelected('dim7')} />
                        <Button label="Zwiększony" onClick={() => onResponseSelected('aug7')} />
                        <Button label="Zwiększony 7w" onClick={() => onResponseSelected('augmaj7')} />
                    </div>
                </div>
            </div>
        ),
        triadsinversions: (
            <div className="quiz-input-inversions">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="Postać zas." onClick={() => onResponseSelected(0)} />
                        <Button label="Przewrót I" onClick={() => onResponseSelected(1)} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Spacer length={0.5} />
                        <Button label="Przewrót II" onClick={() => onResponseSelected(2)} />
                        <Spacer length={0.5} />
                    </div>
                </div>
            </div>
        ),
        seventhsinversions: (
            <div className="quiz-input-inversions">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="Postać zas." onClick={() => onResponseSelected(0)} />
                        <Button label="Przewrót I" onClick={() => onResponseSelected(1)} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Button label="Przewrót II" onClick={() => onResponseSelected(2)} />
                        <Button label="Przewrót III" onClick={() => onResponseSelected(3)} />
                    </div>
                </div>
            </div>
        )
    };

    switch (layout) {
        case 'intervals':
            return inputs.intervals;
        case 'triads':
            return inputs.triads;
        case 'sevenths':
            return inputs.sevenths;
        case 'triadsinversions':
            return inputs.triadsinversions;
        case 'seventhsinversions':
            return inputs.seventhsinversions;
        default:
            return null;
    }
}

export default QuizInput;
