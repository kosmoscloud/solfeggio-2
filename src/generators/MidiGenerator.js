import { useRef, useEffect } from 'react';

const MidiGenerator = () => {
    const midiAccessRef = useRef(null);
    const outputRef = useRef(null);
    const isMidiEnabled = useRef(false);

    const initMIDI = async () => {
        try {
            midiAccessRef.current = await navigator.requestMIDIAccess();
            outputRef.current = Array.from(midiAccessRef.current.outputs.values())[0];
        } catch (error) {
            isMidiEnabled.current = false;
        }
    };

    const sendMIDIMessage = (command, note, velocity) => {
        if (outputRef.current) {
            outputRef.current.send([command, note, velocity]);
        }
    };

    const playNoteOn = (note, velocity = 127) => {
        sendMIDIMessage(0x80, note, 0);
        sendMIDIMessage(0x90, note, velocity);
    };

    const playNoteOff = (note, velocity = 0) => {
        sendMIDIMessage(0x80, note, velocity);
    };

    const playInstrument = async (midiNotes, duration = 1) => {
        if (!Array.isArray(midiNotes)) {
            midiNotes = [midiNotes];
        }
        midiNotes.forEach(note => playNoteOn(note));
        await new Promise(resolve => setTimeout(resolve, duration * 1000));
        midiNotes.forEach(note => playNoteOff(note));
    };

    const playSequence = async (sequence, spacing = 1000, noteLength = 1) => {
        const playNote = async (note) => {
            await playInstrument(note, noteLength);
            return new Promise(resolve => setTimeout(resolve, spacing));
        };

        for (let note of sequence) {
            await playNote(note);
        }
    };

    const playNotes = async (notes, spacing, duration) => {
        if (typeof notes === 'number') {
            return playInstrument(notes, duration);
        } else if (Array.isArray(notes)) {
            if (typeof notes[0] === 'number') {
                return playSequence(notes, spacing * 1000, duration);
            } else if (Array.isArray(notes[0])) {
                const playSequence_inner = async (sequence) => {
                    playInstrument(sequence, duration);
                    return new Promise(resolve => setTimeout(resolve, spacing * 1000));
                }
                for (let sequence of notes) {
                    await playSequence_inner(sequence);
                }
            }
        }
    };

    const setRandomInstrument = () => {
        const instruments = [0, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128];
        const randomInstrument = instruments[Math.floor(Math.random() * instruments.length)];
        sendMIDIMessage(0xC0, randomInstrument, 0);
    };

    // Initialize MIDI on component mount
    useEffect(() => {
        initMIDI();
    }, []);

    return {
        playNoteOn,
        playNoteOff,
        playInstrument,
        playSequence,
        playNotes,
        setRandomInstrument
    };
};

export default MidiGenerator;
