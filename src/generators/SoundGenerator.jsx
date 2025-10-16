import { useRef, useEffect } from 'react';
import { AudioContext } from 'standardized-audio-context';
import { SplendidGrandPiano } from 'smplr';

import ReproductionMode from '../layers/enums/ReproductionMode';

const SoundGenerator = () => {
    const audioContextRef = useRef({});
    const player = useRef({});

    useEffect(() => {
        audioContextRef.current = new AudioContext();
        player.current = new SplendidGrandPiano(audioContextRef.current, {});
    }, []);

    const stopPlaying = () => {
        player.current?.stop();
    }

    const playNotes = async (notes, duration, reproductionMode = ReproductionMode.SIMULTANEOUS, spacing = 0) => {
        if (typeof notes === 'number') {
            notes = [notes];
        }
        if (reproductionMode === ReproductionMode.ASCENDING) {
            notes.sort((a, b) => a - b);
            for (let i = 0; i < notes.length; i++) {
                await new Promise(resolve => setTimeout(resolve, i === 0 ? 0 : duration * 1000));
                await player.current?.start({note: notes[i], duration: duration, velocity: 127});
            }
        } else if (reproductionMode === ReproductionMode.DESCENDING) {
            notes.sort((a, b) => b - a);
            for (let i = 0; i < notes.length; i++) {
                await new Promise(resolve => setTimeout(resolve, i === 0 ? 0 : duration * 1000));
                await player.current?.start({note: notes[i], duration: duration, velocity: 80});
            }
        } else if (reproductionMode === ReproductionMode.SEQUENTIAL) {
            for (let i = 0; i < notes.length; i++) {
                await new Promise(resolve => setTimeout(resolve, i === 0 ? 0 : duration * 1000));
                await player.current?.start({note: notes[i], duration: duration, velocity: 80});
            }
        } else if (reproductionMode === ReproductionMode.SIMULTANEOUS) {
            for (let note of notes) {
                await player.current?.start({note: note, duration: duration, velocity: 80});
            }
        } else if (reproductionMode === ReproductionMode.RANDOM) {
            const modes = [
                ReproductionMode.SIMULTANEOUS,
                ReproductionMode.ASCENDING,
                ReproductionMode.DESCENDING
            ];
            const randomMode = modes[Math.floor(Math.random() * modes.length)];
            await playNotes(notes, duration, randomMode, spacing);
        }
    };

    return {
        playNotes,
        stopPlaying,
    };
};

export default SoundGenerator;
