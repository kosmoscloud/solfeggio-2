import { useRef, useEffect } from 'react';

const MidiGenerator = () => {
    const midiAccessRef = useRef(null);
    const outputRef = useRef(null);

    const initMIDI = async () => {
        try {
            midiAccessRef.current = await navigator.requestMIDIAccess();
            outputRef.current = Array.from(midiAccessRef.current.outputs.values())[0];
        } catch (error) {
            console.error('Could not access MIDI devices.', error);
        }
    };

    const sendMIDIMessage = (command, note, velocity) => {
        if (outputRef.current) {
            outputRef.current.send([command, note, velocity]);
        }
    };

    const playNoteOn = (note, velocity = 127) => {
        sendMIDIMessage(0x90, note, velocity);
    };

    const playNoteOff = (note, velocity = 0) => {
        sendMIDIMessage(0x80, note, velocity);
    };

    const playSineWave = async (midiNote, duration = 1) => {
        playNoteOn(midiNote);
        await new Promise(resolve => setTimeout(resolve, duration * 1000));
        playNoteOff(midiNote);
    };

    const playSequence = async (sequence, spacing = 1000, noteLength = 1) => {
        const playNote = async (note) => {
            await playSineWave(note, noteLength);
            return new Promise(resolve => setTimeout(resolve, spacing));
        };

        for (let note of sequence) {
            await playNote(note);
        }
    };

    const playNotes = async (notes, spacing, duration) => {
        if (typeof notes === 'number') {
            return playSineWave(notes, duration);
        } else if (Array.isArray(notes)) {
            if (typeof notes[0] === 'number') {
                return playSequence(notes, spacing * 1000, duration);
            } else if (Array.isArray(notes[0])) {
                const playSequence_inner = async (sequence) => {
                    playSequence(sequence, 0, duration);
                    return new Promise(resolve => setTimeout(resolve, spacing * 1000));
                }
                for (let sequence of notes) {
                    await playSequence_inner(sequence);
                }
            }
        }
    };

    // Initialize MIDI on component mount
    useEffect(() => {
        initMIDI();
    }, []);

    return {
        playNoteOn,
        playNoteOff,
        playSineWave,
        playSequence,
        playNotes
    };
};

export default MidiGenerator;
