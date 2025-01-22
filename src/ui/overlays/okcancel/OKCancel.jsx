import React, { useContext } from 'react';

import { LanguageContext } from '../../../managers/UILayer';

import Column from '../../../components/table/column/Column';
import Button from '../../../components/button/Button';

function OKCancel({ onOK, onCancel }) {

    const {dictionary} = useContext(LanguageContext);

    return (
        <Column padding={false}>
            <Button onClick={onOK}>{dictionary.ok}</Button>
            <Button onClick={onCancel}>{dictionary.cancel}</Button>
        </Column>
    );
}

export default OKCancel;
