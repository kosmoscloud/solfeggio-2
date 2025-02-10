import React, { useContext, useMemo } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { IOContext } from '../../managers/IOLayer';
import { LanguageContext, UIContext } from '../../managers/UILayer';

import Button from '../../components/Button';
import Header from '../../components/Header';

import './style.css';

function TriadsInput() {
    const enabledTriads = useContext(GlobalSettingsContext).enabledChords.triads;
    const isMobile = useContext(GlobalSettingsContext).isMobile;
    const aspectRatio = useContext(UIContext).aspectRatio;
    const triggerLastAnswer = useContext(IOContext).triggerLastAnswer;
    const { dictionary, symbols } = useContext(LanguageContext);

    const labels = useMemo(() => {
        const major = (aspectRatio <= 1.25 || isMobile) ? symbols.maj : dictionary.major;
        const minor = (aspectRatio <= 1.25 || isMobile) ? symbols.min : dictionary.minor;
        const diminished = (aspectRatio <= 1.25 || isMobile) ? symbols.dim : dictionary.diminished;
        const augmented = (aspectRatio <= 1.25 || isMobile) ? symbols.aug : dictionary.augmented;
        return { major, minor, diminished, augmented }
    }, [aspectRatio, isMobile]);

    const { major, minor, diminished, augmented } = labels

    return  <div className="quiz-input-triads">
                <div className="quiz-input-header">
                    <Header text={dictionary.triads} />
                </div>
                <div className="quiz-input-buttons">
                    <div className="quiz-input-buttons-row">
                        <Button label={major} onClick={() => triggerLastAnswer('maj')} isEnabled={enabledTriads.includes('maj')} />
                        <Button label={minor} onClick={() => triggerLastAnswer('min')} isEnabled={enabledTriads.includes('min')} />
                    </div>
                    <div className="quiz-input-buttons-row">
                        <Button label={diminished} onClick={() => triggerLastAnswer('dim')} isEnabled={enabledTriads.includes('dim')} />
                        <Button label={augmented} onClick={() => triggerLastAnswer('aug')} isEnabled={enabledTriads.includes('aug')} />
                    </div>
                </div>
            </div>
}

export default TriadsInput;
