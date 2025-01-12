import { useRef } from 'react';
import { Soundfont } from 'smplr';

const SoundGenerator = () => {
    const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
    const instrumentsRef = useRef({
        'piano': new Soundfont(audioContextRef.current, { instrument: 'acoustic_grand_piano' }),
        'guitar': new Soundfont(audioContextRef.current, { instrument: 'acoustic_guitar_nylon' }),
        'marimba': new Soundfont(audioContextRef.current, { instrument: 'marimba' }),
        'violin': new Soundfont(audioContextRef.current, { instrument: 'violin' }),
        'flute': new Soundfont(audioContextRef.current, { instrument: 'flute' }),
        'trombone': new Soundfont(audioContextRef.current, { instrument: 'trombone' })
    });

    const stopPlaying = () => {
        for (let instrument in instrumentsRef.current) {
            instrumentsRef.current[instrument].stop();
        }
    };

    const midiToFrequency = (midiNote) => {
        return 440 * Math.pow(2, (midiNote - 69) / 12);
    };

    const playInstrument = async (midiNote, duration, instrument) => {
        instrumentsRef.current[instrument].stop(midiNote);
        instrumentsRef.current[instrument].start({ note: midiNote, velocity: 127 });
        setTimeout(() => instrumentsRef.current[instrument].stop(midiNote), duration * 1000);
    };

    const playSimultaneously = async (notes, duration) => {
        for (let note of notes) {
            playInstrument(note, duration);
        }
    };

    const playSequence = async (sequence, spacing, duration, instrument) => {
        const playNote = async (note) => {
            playInstrument(note, duration, instrument);
            return new Promise(resolve => setTimeout(resolve, spacing * 1000));
        };

        for (let note of sequence) {
            await playNote(note);
        }
    };

    const playNotes = async (notes, spacing, duration, instrument='piano') => {
        if (typeof notes === 'number') {
            return playInstrument(notes, duration, instrument);
        } else if (Array.isArray(notes)) {
            if (typeof notes[0] === 'number') {
                return playSequence(notes, spacing, duration, instrument);
            } else if (Array.isArray(notes[0])) {
                const playSequence_inner = async (sequence) => {
                    playSequence(sequence, 0, duration, instrument);
                    return new Promise(resolve => setTimeout(resolve, spacing * 1000));
                }
                for (let sequence of notes) {
                    await playSequence_inner(sequence);
                }
            }
        }
    };

    return {
        stopPlaying,
        midiToFrequency,
        playInstrument,
        playSimultaneously,
        playSequence,
        playNotes
    };
};

export default SoundGenerator;
