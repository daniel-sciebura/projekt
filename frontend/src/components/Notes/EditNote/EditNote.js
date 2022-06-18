import React, { useState } from "react";


function EditNote(props) {

    const [title, setTitle] = useState(props.title);
    const [desc, setDesc] = useState(props.body);

    const changeTitleHandler = e => {
        const value = e.target.value;
        setTitle(value);
    }

    const changeDescHandler = e => {
        const value = e.target.value;
        setDesc(value);
    }

    const editNote = () => {
        const note = {
            title: title,
            body: desc,
            _id: props._id
        };
        props.onEdit(note)
    }
    

    return (
        <div className="note">
            <label>Tytuł:</label>
            <input type="text"
                value={title}
                onChange={changeTitleHandler}
            />
            <label>Opis:</label>
            <input type="text"
                value={desc}
                onChange={changeDescHandler}
            />
            <button onClick={() => editNote()}>Zapisz</button>
            </div>    
    );
}

export default EditNote;