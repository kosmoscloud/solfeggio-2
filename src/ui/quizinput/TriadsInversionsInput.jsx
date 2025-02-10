import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { IOContext } from '../../managers/IOLayer';
import { LanguageContext } from '../../managers/UILayer';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Spacer from '../../components/FlexContainer';

import './style.css';

function TriadsInversionsInput() {
    const enabledTriadsInversions = useContext(GlobalSettingsContext).enabledInversions.triads;
    const triggerLastAnswer = useContext(IOContext).triggerLastAnswer;
    const { dictionary } = useContext(LanguageContext);

    return <div className="quiz-input-inversions">
                <div className="quiz-input-header">
                    <Header text={dictionary.triadsinversions} />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label="Postać zas." onClick={() => triggerLastAnswer(0)} isEnabled={enabledTriadsInversions.includes(0)} />
                        <Button label="Przewrót I" onClick={() => triggerLastAnswer(1)} isEnabled={enabledTriadsInversions.includes(1)} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Spacer length={0.5} />
                        <Button label="Przewrót II" onClick={() => triggerLastAnswer(2)} isEnabled={enabledTriadsInversions.includes(2)} />
                        <Spacer length={0.5} />
                    </div>
                </div>
            </div>
}

export default TriadsInversionsInput;
