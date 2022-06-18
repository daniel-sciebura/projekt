import React, { useState } from "react";
import './NewNote.css'

function NewNote(props) {

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const changeTitleHandler = e => {
        const value = e.target.value;
        setTitle(value);
    }

    const changeDescHandler = e => {
        const value = e.target.value;
        setDesc(value);
    }

    const addNote = () => {
        const note = {
            title: title,
            body: desc
        };
        props.onAdd(note);

        setTitle('')
        setDesc('');
        setShowForm(false);
    }

    return (
        showForm ? (
        <div className="note">
            <label className="newnote-title">Tytuł:</label>
            <input type="text"
                value={title}
                onChange={changeTitleHandler}
            />
            <label className="newnote-title">Opis:</label>
            <input type="text"
                value={desc}
                onChange={changeDescHandler}
            />
            <button className="newNote" onClick={() => addNote()}>zapisz</button>
            </div>    
        ) : (
         <button className="newNote" onClick={() => setShowForm(true)}>nowa notatka</button>
        )
    );
}

export default NewNote;