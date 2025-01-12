import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsManager';
import { IOContext } from '../../managers/IOManager';

import Button from '../../components/button/Button';
import Header from '../../components/header/Header';

import './style.css';

function SeventhsInput() {

    const triggerLastAnswer = useContext(IOContext).triggerLastAnswer;
    const enabledSevenths = useContext(GlobalSettingsContext).enabledChords.sevenths;

    return  <div className="quiz-input-sevenths">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="Durowy 7w" onClick={() => triggerLastAnswer('maj7')} isEnabled={enabledSevenths.includes('maj7')} />
                        <Button label="Dominantowy" onClick={() => triggerLastAnswer('dom7')} isEnabled={enabledSevenths.includes('dom7')} />
                        <Button label="Molowy 7m" onClick={() => triggerLastAnswer('min7')} isEnabled={enabledSevenths.includes('min7')} />
                        <Button label="Półzmniejszony" onClick={() => triggerLastAnswer('min7b5')} isEnabled={enabledSevenths.includes('min7b5')} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Button label="Molowy 7w" onClick={() => triggerLastAnswer('minmaj7')} isEnabled={enabledSevenths.includes('minmaj7')} />
                        <Button label="Zmniejszony" onClick={() => triggerLastAnswer('dim7')} isEnabled={enabledSevenths.includes('dim7')} />
                        <Button label="Zwiększony" onClick={() => triggerLastAnswer('aug7')} isEnabled={enabledSevenths.includes('aug7')} />
                        <Button label="Zwiększony 7w" onClick={() => triggerLastAnswer('augmaj7')} isEnabled={enabledSevenths.includes('augmaj7')} />
                    </div>
                </div>
            </div>
}

export default SeventhsInput;