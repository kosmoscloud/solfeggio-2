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

    playSequence(sequence, duration = 1, noteLength = 1) {
        const playNote = async (note) => {
            this.playSineWave(note, noteLength);
            return new Promise(resolve => setTimeout(resolve, duration * 10));
        };

        const playMelodySequentially = async () => {
            for (let note of sequence) {
                await playNote(note);
            }
        };

        playMelodySequentially();
    }

}

export default SoundGenerator;
