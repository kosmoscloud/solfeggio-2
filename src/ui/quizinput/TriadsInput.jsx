import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { IOContext } from '../../managers/IOLayer';

import Button from '../../components/button/Button';
import Header from '../../components/header/Header';

import './style.css';

function TriadsInput() {
    const enabledTriads = useContext(GlobalSettingsContext).enabledChords.triads;
    const triggerLastAnswer = useContext(IOContext).triggerLastAnswer;

    return  <div className="quiz-input-triads">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="Durowy" onClick={() => triggerLastAnswer('maj')} isEnabled={enabledTriads.includes('maj')} />
                        <Button label="Molowy" onClick={() => triggerLastAnswer('min')} isEnabled={enabledTriads.includes('min')} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Button label="Zmniejszony" onClick={() => triggerLastAnswer('dim')} isEnabled={enabledTriads.includes('dim')} />
                        <Button label="Zwiększony" onClick={() => triggerLastAnswer('aug')} isEnabled={enabledTriads.includes('aug')} />
                    </div>
                </div>
            </div>
}

export default TriadsInput;
