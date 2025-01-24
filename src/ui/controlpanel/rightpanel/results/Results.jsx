import React from 'react';

import { ResultsContext } from '../../../../managers/ExerciseLayer';
import { LanguageContext } from '../../../../managers/UILayer';

import Button from '../../../../components/button/Button';
import Spacer from '../../../../components/spacer/Spacer';
import Text from '../../../../components/text/Text';

import './style.css';

function Results() {
    const { notesResults, examplesResults } = React.useContext(ResultsContext);
    const { dictionary } = React.useContext(LanguageContext);

    return (
        <Button>
            <Text size='small'>{dictionary.result.toUpperCase() + ":"}</Text>
            <Spacer length={1} />
            <Text size='small'>{examplesResults.examplesCorrect}:{examplesResults.examplesTotal}{"(" + Math.round(examplesResults.examplesCorrect * 100 / examplesResults.examplesTotal) + "%)" }</Text>
        </Button>
    );
}

export default Results;
