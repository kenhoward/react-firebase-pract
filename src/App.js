import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';
import swal from 'sweetalert';

class App extends Component {
    constructor(props) {
        super(props);
        this.updateNoteList = this.updateNoteList.bind(this);

        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app
            .database()
            .ref()
            .child('notes');

        this.state = {
            notes: []
        };
    }

    componentWillMount() {
        const previousNotes = this.state.notes;

        // DataSnapshot
        this.database.on('child_added', snap => {
            previousNotes.push({
                id: snap.key,
                noteContent: snap.val().noteContent
            });

            this.setState({
                notes: previousNotes
            });
        });
    }

    updateNoteList(note) {
        this.database.push().set({ noteContent: note });
    }

    render() {
        return (
            <div className="notes-wrapper">
                <div className="notes-header">
                    <div className="heading">My Dope To Do List</div>
                </div>
                <div className="notes-body">
                    {this.state.notes.map(function(note) {
                        return (
                            <Note
                                noteContent={note.noteContent}
                                noteId={note.Id}
                                key={note.Id}
                            />
                        );
                    })}
                </div>
                <div className="notes-footer">
                    <NoteForm updateNoteList={this.updateNoteList} />
                </div>
            </div>
        );
    }
}

export default App;
