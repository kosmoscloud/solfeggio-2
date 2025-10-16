import { useContext } from 'react';

import { LanguageContext } from '../../../layers/UILayer';

import Button from '../../../components/Button';
import AbsoluteContainer from '../../../components/AbsoluteContainer';

function OKCancel({ onOK, top }) {

    const {dictionary} = useContext(LanguageContext);

    return (
        <AbsoluteContainer top={top} left='50%' minWidth='15%' minHeight='10%'>
            <Button label={dictionary.ok} onClick={onOK}/>
        </AbsoluteContainer>
    );
}

export default OKCancel;
