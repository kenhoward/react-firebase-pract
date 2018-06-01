import React, { Component } from 'react';
import logo from './logo.svg';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import './App.css';
import swal from 'sweetalert';

class App extends Component {
	constructor(props) {
		super(props);
		this.updateNoteList = this.updateNoteList.bind(this)

		this.state = {
			notes: [
				{ id: 1, noteContent: 'Note 1 here' },
				{ id: 2, noteContent: 'Note 2 here' }
			]
		};
	}

	updateNoteList(note) {
		const previousNotes = this.state.notes;
		previousNotes.push({ id: previousNotes.length + 1, noteContent: note });
		this.setState({
			notes: previousNotes
		})
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
