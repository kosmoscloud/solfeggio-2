import React, { useState, createContext } from 'react';

export const ExerciseContext = createContext();
export const ResultsContext = createContext();

function ResultsLayer({ children }) {
    const [notesResults, setNotesResults] = useState({
        notesCorrect: 0,
        notesTotal: 0
    });
    const [examplesResults, setExamplesResults] = useState({
        examplesCorrect: 0,
        examplesTotal: 0
    });

    const updateResults = (type, correct) => {
        const results = type === 'notes' ? notesResults : examplesResults;
        const newResults = {
            ...results,
            [`${type}Correct`]: correct ? results[`${type}Correct`] + 1 : results[`${type}Correct`],
            [`${type}Total`]: results[`${type}Total`] + 1
        };
        type === 'notes' ? setNotesResults(newResults) : setExamplesResults(newResults);
    }

    const resetResults = (type) => {
        type === 'notes' ? setNotesResults({ notesCorrect: 0, notesTotal: 0 }) : setExamplesResults({ examplesCorrect: 0, examplesTotal: 0 });
    }

    return (
        <ResultsContext.Provider value={{ 
            notesResults, 
            examplesResults, 
            updateNotesResults: (correct) => updateResults('notes', correct), 
            updateExamplesResults: (correct) => updateResults('examples', correct), 
            resetNotesResults: () => resetResults('notes'), 
            resetExamplesResults: () => resetResults('examples') 
        }}>
            {children}
        </ResultsContext.Provider>
    );
}

export default ResultsLayer;
