import React from "react";
import './Notes.css';
import Note from './Note/Note';
import NewNote from "./NewNote/NewNote";
import Modal from 'react-modal';
import EditNote from "./EditNote/EditNote";
import axios from '../../axios';

class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            showEditModal: false,
            editNote: {}
        };
    }

    //metoda uruchomi sie jeden raz na samym poczatku gdy komponent zostal zamontowany
    componentDidMount() {
        this.fetchNotes();
    }

    async fetchNotes() {
        const res = await axios.get('/notes');
        const notes = res.data;
        this.setState({ notes });
    }


    //usuwanie notatki
    async deleteNote(_id) {
        //filtrowanie notatek 
        const notes = [...this.state.notes].filter(note => note._id !== _id);

        await axios.delete('/notes/' + _id);

        this.setState({ notes: notes });
    }


    //dodawanie notatki
    async addNote(note) {
        /*kopiuje aktualny stan notatek*/
        const notes = [...this.state.notes]
        //obsluga bledu np przy pustej notatce
        try {
            //dodawanie do backendu
            const res = await axios.post('/notes', note);
            const newNote = res.data;
            /*dodawania do frontu*/
            notes.push(newNote);
            this.setState({ notes: notes });
        } catch (err) {
            console.log(err.response.data)
        }
    }

    async editNote(note) {
        //edycja backendu

        await axios.put('/notes/' + note._id, note)

        //edycja frontendu

        //kopiuje aktualny stan notatek
        const notes = [...this.state.notes]
        const index = notes.findIndex(item => item._id === note._id)
        //jezeli index jest wiekszy lub rowny 0 wtedy notatka o tym indexie = nasza nowa notatka zedytowana
        if (index >= 0) {
            notes[index] = note;
            //aktualizacja notatek
            this.setState({ notes: notes });
        }
        this.toggleModal();
    }

    toggleModal() {
        this.setState({ showEditModal: !this.state.showEditModal });
    }

    editNoteHandler(note) {
        this.toggleModal();
        this.setState({ editNote: note });
    }

    
    render() {

        //petla po wszystkich notatkach
        return (
            <div>
            
                <p className="notes-title">Moje notatki:</p>

                <NewNote
                onAdd={(note) => this.addNote(note)}
                />



                <Modal isOpen={this.state.showEditModal}
                    contentLabel="Edytuj notatkę"
                    ariaHideApp={false}>
                    
                    <EditNote
                        title={this.state.editNote.title}
                        body={this.state.editNote.body}
                        _id={this.state.editNote._id}
                        onEdit={note => this.editNote(note)} />
                    <button onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>


                
            {this.state.notes.map(note => (
                <Note
                    key={note._id}
                    title={note.title}
                    body={note.body}
                    _id={note._id}
                    onEdit={(note) => this.editNoteHandler(note)}
                    onDelete={(_id) => this.deleteNote(_id)}
                />
            ))}
        </div>
		);
    }
}

export default Notes;