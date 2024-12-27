class SoundGenerator {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    midiToFrequency(midiNote) {
        return 440 * Math.pow(2, (midiNote - 69) / 12);
    }

    playSineWave(midiNote, duration = 1) {
        const frequency = this.midiToFrequency(midiNote);
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    async playSimultaneously(notes, duration = 1) {
        notes.forEach(note => this.playSineWave(note, duration));
    }

    async playSequence(sequence, spacing = 1000, noteLength = 1) {
        const playNote = async (note) => {
            this.playSineWave(note, noteLength);
            return new Promise(resolve => setTimeout(resolve, spacing));
        };

        for (let note of sequence) {
            await playNote(note);
        }
    }

    async playChords(chords, spacing = 1000, noteLength = 1) {
        const playChord = async (chord) => {
            this.playSimultaneously(chord, noteLength);
            return new Promise(resolve => setTimeout(resolve, spacing));
        }

        for (let chord of chords) {
            await playChord(chord);
        }
    }

}

export default SoundGenerator;
