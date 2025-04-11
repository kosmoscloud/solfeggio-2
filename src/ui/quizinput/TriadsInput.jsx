import React, { useContext, useMemo } from 'react';

import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { IOContext } from '../../layers/IOLayer';
import { LanguageContext, UIContext } from '../../layers/UILayer';

import Button from '../../components/Button';

import './style.css';
import FlexContainer from '../../components/FlexContainer';

function TriadsInput() {
    const enabledTriads = useContext(GlobalSettingsContext).enabledChords.triads;
    const enabledInversions = useContext(GlobalSettingsContext).enabledInversions.triads;
    const isMobile = useContext(GlobalSettingsContext).isMobile;
    const aspectRatio = useContext(UIContext).aspectRatio;
    const triggerLastInput = useContext(IOContext).triggerLastInput;
    const markedAnswers = useContext(IOContext).markedAnswers;
    const { dictionary, symbols } = useContext(LanguageContext);

    const labels = useMemo(() => {
        const major = (aspectRatio <= 1.25 || isMobile) ? symbols.maj : dictionary.major;
        const minor = (aspectRatio <= 1.25 || isMobile) ? symbols.min : dictionary.minor;
        const diminished = (aspectRatio <= 1.25 || isMobile) ? symbols.dim : dictionary.diminished;
        const augmented = (aspectRatio <= 1.25 || isMobile) ? symbols.aug : dictionary.augmented;
        return { major, minor, diminished, augmented }
    }, [aspectRatio, isMobile]);

    const { major, minor, diminished, augmented } = labels

    const containerstyle = {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        top: '13%',
        left: '10%',
        height: '40%',
        width: '80%',
        gap: '2vmin'
    };

    return  <div style={containerstyle}>
                <FlexContainer direction='column' length={2} padding={false} gap={1}>
                    <FlexContainer direction='row' length={2} padding={false} gap={1}>
                        <Button label={major} onClick={() => triggerLastInput('maj')} isEnabled={enabledTriads.includes('maj')} isSelected={markedAnswers.includes('maj')} />
                        <Button label={minor} onClick={() => triggerLastInput('min')} isEnabled={enabledTriads.includes('min')} isSelected={markedAnswers.includes('min')} />
                    </FlexContainer>
                    <FlexContainer direction='row' length={2} padding={false} gap={1}>
                        <Button label={diminished} onClick={() => triggerLastInput('dim')} isEnabled={enabledTriads.includes('dim')} isSelected={markedAnswers.includes('dim')} />
                        <Button label={augmented} onClick={() => triggerLastInput('aug')} isEnabled={enabledTriads.includes('aug')} isSelected={markedAnswers.includes('aug')} />
                    </FlexContainer>
                </FlexContainer>
                <FlexContainer direction='column' length={2} padding={false} gap={1}>
                    <FlexContainer direction='row' length={2} padding={false} gap={1}>
                        <Button label='postac zas' onClick={() => triggerLastInput(0)} isEnabled={enabledInversions.includes(0)} isSelected={markedAnswers.includes(0)} />
                        <Button label='I przewrot' onClick={() => triggerLastInput(1)} isEnabled={enabledInversions.includes(1)} isSelected={markedAnswers.includes(1)} />
                    </FlexContainer>
                    <FlexContainer direction='row' length={2} padding={false} gap={1}>
                        <FlexContainer length={0.5} padding={false}/>
                        <FlexContainer length={1} padding={false}>
                            <Button label='II przewrot' onClick={() => triggerLastInput(2)} isEnabled={enabledInversions.includes(2)} isSelected={markedAnswers.includes(2)} />
                        </FlexContainer>
                        <FlexContainer length={0.5} padding={false}/>
                    </FlexContainer>
                </FlexContainer>
            </div>
}

export default TriadsInput;
