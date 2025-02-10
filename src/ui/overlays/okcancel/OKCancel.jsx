import React, { useContext } from 'react';

import { LanguageContext } from '../../../layers/UILayer';

import Button from '../../../components/Button';
import FlexContainer from '../../../components/FlexContainer';

function OKCancel({ onOK, onCancel }) {

    const {dictionary} = useContext(LanguageContext);

    return (
        <FlexContainer padding={false}>
            <Button onClick={onOK}>{dictionary.ok}</Button>
            <Button onClick={onCancel}>{dictionary.cancel}</Button>
        </FlexContainer>
    );
}

export default OKCancel;
