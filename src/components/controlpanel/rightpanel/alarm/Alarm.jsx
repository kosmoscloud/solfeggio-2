import React from 'react';
import './style.css'
import { ResultsContext } from '../../../../managers/ExercisesManager';

function Alarm() {
  
  const { notesResults } = React.useContext(ResultsContext);
  const [ correctTotalDifference, setCorrectTotalDifference ] = React.useState(notesResults.notesTotal - notesResults.notesCorrect);
  const [ isAlarm, setIsAlarm ] = React.useState(false);

  React.useEffect(() => {
    if (correctTotalDifference - (notesResults.notesTotal - notesResults.notesCorrect) < 0) {
      setIsAlarm(true);
      setTimeout(() => {
        setIsAlarm(false);
      }, 1000);
    }
    setCorrectTotalDifference(notesResults.notesTotal - notesResults.notesCorrect);
  }, [notesResults.notesTotal, notesResults.notesCorrect, correctTotalDifference]);
  
  return (
    <div className="alarm">
      <div className={"alarm-display" + (isAlarm ? "-lit" : "")}/>
    </div>
  );
}

export default Alarm;
