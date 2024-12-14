import React, { useState, createContext } from 'react';

export const ExerciseContext = createContext();
export const ActiveExerciseContext = createContext();
export const ResultsContext = createContext();
export const UserHistoryContext = createContext();

function ExercisesManager({ children }) {
    const [activeExercise, setActiveExercise] = useState(null);
    const [notesResults, setNotesResults] = useState({
        notesCorrect: 0,
        notesTotal: 0
    });
    const [examplesResults, setExamplesResults] = useState({
        examplesCorrect: 0,
        examplesTotal: 0
    });
    const [userHistory, setUserHistory] = useState({
        lastNotePlayed: null,
        last10Notes: []
    });

    const startExercise = (exercise) => {
        setActiveExercise(exercise);
    }

    const stopExercise = () => {
        setActiveExercise(null);
    }

    const updateNotesResults = (correct) => {
        const newNotesResults = {
            notesCorrect: correct ? notesResults.notesCorrect + 1 : notesResults.notesCorrect,
            notesTotal: notesResults.notesTotal + 1
        };
        setNotesResults(newNotesResults);
    }

    const resetNotesResults = () => {
        setNotesResults({
            notesCorrect: 0,
            notesTotal: 0
        });
    }

    const updateExamplesResults = (correct) => {
        const newExamplesResults = {
            examplesCorrect: correct ? examplesResults.examplesCorrect + 1 : examplesResults.examplesCorrect,
            examplesTotal: examplesResults.examplesTotal + 1
        };
        setExamplesResults(newExamplesResults);
    }

    const resetExamplesResults = () => {
        setExamplesResults({
            examplesCorrect: 0,
            examplesTotal: 0
        });
    }

    const updateHistory = (note) => {
        setUserHistory((prevHistory) => {
            const newHistory = {
                lastNotePlayed: note,
                last10Notes: [note, ...prevHistory.last10Notes].slice(0, 10)
            };
            return newHistory;
        });
    }

    const renderActiveExercise = () => {
        if (activeExercise) {
            return activeExercise;
        }
    }

    return (
        <ActiveExerciseContext.Provider value={{ activeExercise, startExercise, stopExercise }}>
            <ResultsContext.Provider value={{ notesResults, examplesResults, updateNotesResults, updateExamplesResults, resetNotesResults, resetExamplesResults }}>
                <UserHistoryContext.Provider value={{ userHistory, updateHistory }}>
                    {children}
                    {renderActiveExercise()}
                </UserHistoryContext.Provider>
            </ResultsContext.Provider>
        </ActiveExerciseContext.Provider>
    );
}

export default ExercisesManager;
