import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { IOContext } from '../../managers/IOLayer';
import { LanguageContext } from '../../managers/UILayer';

import Button from '../../components/Button';
import Header from '../../components/Header';

import './style.css';

function QuizInput() {

    const enabledSeventhsInversions = useContext(GlobalSettingsContext).enabledInversions.sevenths;
    const triggerLastAnswer = useContext(IOContext).triggerLastAnswer;

    const { dictionary } = useContext(LanguageContext);

    return  <div className="quiz-input-inversions">
                <div className="quiz-input-header">
                    <Header text={dictionary.seventhsinversions} />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="Postać zas." onClick={() => triggerLastAnswer(0)} isEnabled={enabledSeventhsInversions.includes(0)} />
                        <Button label="Przewrót I" onClick={() => triggerLastAnswer(1)} isEnabled={enabledSeventhsInversions.includes(1)} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Button label="Przewrót II" onClick={() => triggerLastAnswer(2)} isEnabled={enabledSeventhsInversions.includes(2)} />
                        <Button label="Przewrót III" onClick={() => triggerLastAnswer(3)} isEnabled={enabledSeventhsInversions.includes(3)} />
                    </div>
                </div>
            </div>
}

export default QuizInput;
