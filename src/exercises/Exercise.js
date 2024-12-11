class Exercise {
    constructor() {
        this.state = {
            lastPlayedNote: null,
            notesHistory: []
        };
    }

    get lastPlayedNote() {
        return this.state.lastPlayedNote;
    }

    set lastPlayedNote(value) {
        this.setState({lastPlayedNote: value});
    }

    get notesHistory() {
        return this.state.notesHistory;
    }

    addNoteToHistory(note) {
        this.state.notesHistory.push(note);
    }
}

export default Exercise;
