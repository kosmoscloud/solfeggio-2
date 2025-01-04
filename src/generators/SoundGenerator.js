

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
    
    async playSequence(sequence, spacing = 1, duration = 1) {
        const playNote = async (note) => {
            this.playSineWave(note, duration);
            return new Promise(resolve => setTimeout(resolve, spacing));
        };

        for (let note of sequence) {
            await playNote(note);
        }
    }

    // if notes is a number, play a single note
    // if notes is an array, play a cluster of notes
    // if notes is an array of arrays, play a sequence of notes/clusters
    // duration and spacing are in seconds
    async playNotes(notes, spacing = 1, duration = 1) {
        if (typeof notes === 'number') {
            return this.playSineWave(notes, duration);
        } else if (Array.isArray(notes)) {
            if (typeof notes[0] === 'number') {
                return this.playSequence(notes, 0, duration);
            } else if (Array.isArray(notes[0])) {
                const playSequence = async (sequence) => {
                    this.playSequence(sequence, 0, duration);
                    return new Promise(resolve => setTimeout(resolve, spacing * 1000));
                }
                for (let sequence of notes) {
                    await playSequence(sequence);
                }
            }
        }
        
    }
}

export default SoundGenerator;
