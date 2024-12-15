import React from 'react';
import './style.css'
import { ExerciseContext } from '../../../../managers/ExercisesManager';

function Timer(props) {

  const { enabledComponents } = React.useContext(ExerciseContext);
  const enabled = enabledComponents.includes('timer');

  return (
    <div className={enabled ? "timer" : "disabled-timer"}>
      <div className={enabled ? "timer-background" : "disabled-timer-background"}/> 
      <div className={enabled ? "timer-progress-bar" : "disabled-timer-progress-bar"}/>
      <div className={enabled ? "timer-text" : "disabled-timer-text"}>CZAS</div>
    </div>
  );
}

export default Timer;
