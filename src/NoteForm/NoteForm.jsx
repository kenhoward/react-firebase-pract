import React, { Component } from 'react';
import './NoteForm.css';
import swal from 'sweetalert';

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newNoteContent: ''
        };
        // we need to explicitly bind our input
        this.handleUserInput = this.handleUserInput.bind(this);
        this.addNote = this.addNote.bind(this);
        this.clearNote = this.clearNote.bind(this);
    }

    // handles what the user is typing
    handleUserInput(e) {
        this.setState({
            newNoteContent: e.target.value
        });
    }

    addNote() {
        const newNote = this.state.newNoteContent;
        if (newNote !== '') {
            this.props.updateNoteList(newNote);

            this.setState({
                newNoteContent: ''
            });
        } else {
            swal('ERROR!', 'Please input some text', 'error');
        }
    }

    clearNote() {
        if (this.state.newNoteContent !== '') {
            swal({
                title: 'Are you sure?',
                icon: 'warning',
                buttons: true,
                dangerMode: true
            }).then(willDelete => {
                if (willDelete) {
                    this.setState({
                        newNoteContent: ''
                    });
                }
            });
        }
    }

    render() {
        return (
            <div className="form-wrapper">
                <input
                    className="note-input"
                    placeholder="Write a new note..."
                    value={this.state.newNoteContent}
                    onChange={this.handleUserInput}
                />
                <button className="note-btn" onClick={this.addNote}>
                    Add Note
                </button>
                <button className="clear-btn" onClick={this.clearNote}>
                    Clear
                </button>
            </div>
        );
    }
}

export default NoteForm;
