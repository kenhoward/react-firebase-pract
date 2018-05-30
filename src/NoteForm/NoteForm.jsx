import React, { Component } from 'react';
import './NoteForm.css';

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

	handleUserInput(e) {
		this.setState({
			newNoteContent: e.target.value
		});
	}

	addNote() {
		this.props.updateNoteList(this.state.newNoteContent);

		this.setState({
			newNoteContent: ''
		});
	}

	clearNote(e) {
		this.setState({
			newNoteContent: ''
		});
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
