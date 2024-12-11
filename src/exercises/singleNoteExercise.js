import { openKeyboard } from '../components/keyboard/Keyboard.jsx';
import { openControlPanel } from '../components/controlpanel/ControlPanel.jsx';

class SingleNoteExercise {
    run() {
        openKeyboard();
        openControlPanel();
    }
}

export function run() {
    const exercise = new SingleNoteExercise();
    exercise.run();
}
