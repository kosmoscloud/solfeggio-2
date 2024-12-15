import React from 'react';
import { ResultsContext } from '../../../../managers/ExercisesManager';
import './style.css';

function Results() {
    const { notesResults, examplesResults } = React.useContext(ResultsContext);

    return (
        <div className="results-display">
            <div className="results-header">
                <div className="results-title">
                    WYNIKI
                </div>
                <div className="results-spacer">
                    <div className="results-description">
                        DOBRZE:OGÓŁEM
                    </div>
                </div>
            </div>
            <div className="results-table">
                <div className="table-column">
                    <div className="sounds-title">Dźwięki</div>
                    <div className="examples-title">Przykłady</div>
                </div>
                <div className="table-column">
                    <div className="sounds-value">{notesResults.notesCorrect}:{notesResults.notesTotal}</div>
                    <div className="examples-value">{examplesResults.examplesCorrect}:{examplesResults.examplesTotal}</div>
                </div>
            </div>
        </div>
    );
}

export default Results;
