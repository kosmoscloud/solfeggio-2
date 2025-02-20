import React, { useContext } from 'react';

import { LanguageContext } from '../../../layers/UILayer';

import Button from '../../../components/Button';
import AbsoluteContainer from '../../../components/AbsoluteContainer';
import FlexContainer from '../../../components/FlexContainer';

function OKCancel({ onOK, onCancel, top }) {

    const {dictionary} = useContext(LanguageContext);

    return (
        <AbsoluteContainer top={top} left='50%' minWidth='30%' minHeight='10%'>
            <FlexContainer direction='row' gap={2}>
                <Button label={dictionary.ok} onClick={onOK}/>
                <Button label={dictionary.cancel} onClick={onCancel}/>
            </FlexContainer>
        </AbsoluteContainer>
    );
}

export default OKCancel;
