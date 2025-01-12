import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsManager';
import { IOContext } from '../../managers/IOManager';

import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import Spacer from '../../components/spacer/Spacer';

import './style.css';

function TriadsInversionsInput() {
    const enabledTriadsInversions = useContext(GlobalSettingsContext).enabledInversions.triads;
    const triggerLastAnswer = useContext(IOContext).triggerLastAnswer;

    return <div className="quiz-input-inversions">
                <div className="quiz-input-header">
                    <Header text="Możliwe odpowiedzi" />
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