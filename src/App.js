import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.updateNoteList = this.updateNoteList.bind(this);
        this.removeNote = this.removeNote.bind(this);

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

        this.database.on('child_removed', snap => {
            // previousNotes.map(function(previousNote) {
            //     if (previousNote === snap.key) {
            //         return previousNote.splice(previousNote, 1);
            //     }
            // });
            for (var i = 0; i < previousNotes.length; i++) {
                if (previousNotes[i].id === snap.key) {
                    previousNotes.splice(i, 1);
                }
            }

            this.setState({
                notes: previousNotes
            });
        });
    }

    updateNoteList(note) {
        this.database.push().set({ noteContent: note });
    }

    removeNote(noteId) {
        this.database.child(noteId).remove();
    }

    render() {
        return (
            <div className="notes-wrapper">
                <div className="notes-header">
                    <div className="heading">My Dope To Do List</div>
                </div>
                <div className="notes-body">
                    {this.state.notes.map(note => {
                        return (
                            <Note
                                noteContent={note.noteContent}
                                noteId={note.id}
                                key={note.id}
                                removeNote={this.removeNote}
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
