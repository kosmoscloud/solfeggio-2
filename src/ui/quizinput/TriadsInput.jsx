import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { IOContext } from '../../managers/IOLayer';
import { LanguageContext } from '../../managers/UILayer';

import Button from '../../components/button/Button';
import Header from '../../components/header/Header';

import './style.css';

function TriadsInput() {
    const enabledTriads = useContext(GlobalSettingsContext).enabledChords.triads;
    const triggerLastAnswer = useContext(IOContext).triggerLastAnswer;
    const { dictionary } = useContext(LanguageContext);

    return  <div className="quiz-input-triads">
                <div className="quiz-input-header">
                    <Header text={dictionary.answers} />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label={dictionary.major} onClick={() => triggerLastAnswer('maj')} isEnabled={enabledTriads.includes('maj')} />
                        <Button label={dictionary.minor} onClick={() => triggerLastAnswer('min')} isEnabled={enabledTriads.includes('min')} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Button label={dictionary.diminished} onClick={() => triggerLastAnswer('dim')} isEnabled={enabledTriads.includes('dim')} />
                        <Button label={dictionary.augmented} onClick={() => triggerLastAnswer('aug')} isEnabled={enabledTriads.includes('aug')} />
                    </div>
                </div>
            </div>
}

export default TriadsInput;
