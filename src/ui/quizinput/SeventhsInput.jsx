import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { IOContext } from '../../managers/IOLayer';
import { LanguageContext } from '../../managers/UILayer';

import Button from '../../components/button/Button';
import Header from '../../components/header/Header';

import './style.css';

function SeventhsInput() {

    const triggerLastAnswer = useContext(IOContext).triggerLastAnswer;
    const enabledSevenths = useContext(GlobalSettingsContext).enabledChords.sevenths;

    const { dictionary } = useContext(LanguageContext);

    return  <div className="quiz-input-sevenths">
                <div className="quiz-input-header">
                    <Header text={dictionary.seventhchords} />
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
