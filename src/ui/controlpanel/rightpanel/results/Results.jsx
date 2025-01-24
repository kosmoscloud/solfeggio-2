import React from 'react';

import { ResultsContext } from '../../../../managers/ExerciseLayer';
import { LanguageContext } from '../../../../managers/UILayer';

import Column from '../../../../components/table/column/Column';
import Spacer from '../../../../components/spacer/Spacer';
import Text from '../../../../components/text/Text';

import './style.css';

function Results() {
    const { notesResults, examplesResults } = React.useContext(ResultsContext);
    const { dictionary } = React.useContext(LanguageContext);

    return (
        <Spacer>
            <div className="results-header">
                <Text size='small'>{dictionary.results.toUpperCase()}</Text>
                <Spacer length={1} />
                <Text size='small'>{dictionary.correct}:{dictionary.total}</Text>
            </div>
            <Spacer length={0.2} />
            <div className="results-table">
                <Column gap={false}>
                    <Text size='small' center={false}>{dictionary.sounds}</Text>
                    <Spacer length={1} />
                    <Text size='small' center={false}>{dictionary.examples}</Text>
                </Column>
                <Spacer length={0.25} />
                <Column gap={false}>
                    <Text size='small' center={false}>{notesResults.notesCorrect}:{notesResults.notesTotal}</Text>
                    <Spacer length={1} />
                    <Text size='small' center={false}>{examplesResults.examplesCorrect}:{examplesResults.examplesTotal}</Text>
                </Column>
            </div>
        </Spacer>
    );
}

export default Results;
