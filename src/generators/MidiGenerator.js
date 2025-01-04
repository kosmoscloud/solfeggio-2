class MIDIGenerator {
    constructor() {
        this.midiAccess = null;
        this.output = null;
        this.initMIDI();
    }

    async initMIDI() {
        try {
            this.midiAccess = await navigator.requestMIDIAccess();
            this.output = Array.from(this.midiAccess.outputs.values())[0];
        } catch (error) {
            console.error('Could not access MIDI devices.', error);
        }
    }

    sendMIDIMessage(command, note, velocity) {
        if (this.output) {
            this.output.send([command, note, velocity]);
        }
    }

    playNoteOn(note, velocity = 127) {
        this.sendMIDIMessage(0x90, note, velocity);
    }

    playNoteOff(note, velocity = 0) {
        this.sendMIDIMessage(0x80, note, velocity);
    }

    async playSineWave(midiNote, duration = 1) {
        this.playNoteOn(midiNote);
        await new Promise(resolve => setTimeout(resolve, duration * 1000));
        this.playNoteOff(midiNote);
    }

    async playSimultaneously(notes, duration = 1) {
        notes.forEach(note => this.playNoteOn(note));
        await new Promise(resolve => setTimeout(resolve, duration * 1000));
        notes.forEach(note => this.playNoteOff(note));
    }

    async playSequence(sequence, spacing = 1000, noteLength = 1) {
        const playNote = async (note) => {
            await this.playSineWave(note, noteLength);
            return new Promise(resolve => setTimeout(resolve, spacing));
        };

        for (let note of sequence) {
            await playNote(note);
        }
    }

    async playChords(chords, spacing = 1000, noteLength = 1) {
        const playChord = async (chord) => {
            await this.playSimultaneously(chord, noteLength);
            return new Promise(resolve => setTimeout(resolve, spacing));
        }

        for (let chord of chords) {
            await playChord(chord);
        }
    }
}

export default MIDIGenerator;
