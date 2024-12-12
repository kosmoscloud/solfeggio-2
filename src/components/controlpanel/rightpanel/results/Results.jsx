import React from 'react';
import './style.css';
import { ResultsContext } from '../../../../managers/ExercisesManager';
import { useEffect } from 'react';

function Results(props) {
    const { notesResults, examplesResults } = React.useContext(ResultsContext);

    return (
        <div className={"box"+props.number}>
            <div className="results-display">
                <div className="results-header">
                    <div className="results-title">
                        WYNIKI
                    </div>
                    <div className="results-description">
                        DOBRZE:ŹLE
                    </div>
                </div>
                <div className="results-table">
                    <div className="sounds-title">Dźwięki</div>
                    <div className="examples-title">Przykłady</div>
                    <div className="sounds-value">{notesResults.notesCorrect}:{notesResults.notesTotal}</div>
                    <div className="examples-value">{examplesResults.examplesCorrect}:{examplesResults.examplesTotal}</div>
                </div>
            </div>
        </div>
    );
}

export default Results;
