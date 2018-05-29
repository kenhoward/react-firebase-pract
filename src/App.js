import React, { Component } from 'react';
import logo from './logo.svg';
import Note from './Note/Note';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		// going to setup the React state of our component
		this.state = {
			notes: [
				{ id: 1, noteContent: 'Note 1 here' },
				{ id: 2, noteContent: 'Note 2 here' }
			]
		};
	}
	render() {
		return (
			<div className="notes-wrapper">
				<div className="notes-header">
					<div className="heading">My Dope To Do List</div>
				</div>
				<div className="notes-body">
					{
						this.state.notes.map(function(note) {
							return (
								<Note noteContent={note.noteContent} noteId={note.Id} key={note.Id} />
							)
						})
					}
				</div>
				<div className="notes-footer">
					Footer will go here...
				</div>
			</div>
		);
	}
}

export default App;
