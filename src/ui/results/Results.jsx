import React from 'react';

import { ResultsContext } from '../../layers/ExerciseLayer';
import { LanguageContext } from '../../layers/UILayer';

import FlexContainer from '../../components/FlexContainer';
import Text from '../../components/Text';

import './style.css';

function Results() {
    const { examplesResults } = React.useContext(ResultsContext);
    const { dictionary } = React.useContext(LanguageContext);

    return (
        <FlexContainer direction='row' padding={false} gap={2}>
            <Text size='small'>{dictionary.result.toUpperCase() + ":"}</Text>
            <Text size='small'>{examplesResults.examplesCorrect}:{examplesResults.examplesTotal}{"(" + Math.round(examplesResults.examplesCorrect * 100 / examplesResults.examplesTotal) + "%)" }</Text>
        </FlexContainer>
    );
}

export default Results;
