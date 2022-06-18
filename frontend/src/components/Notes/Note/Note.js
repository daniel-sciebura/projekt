import React, { useState } from 'react';

//komponent funkcyjny z propsami

function Note(props) {
	
	//notatki domyslnie schowane
	const [showDesc, setShowDesc] = useState(false);

	//funkcja pokazywania i chowania notatek
	const toggleDesc = () => {
		setShowDesc(!showDesc);
	}

	const editHandler = () => {
		props.onEdit({
			title: props.title,
			body: props.body,
			_id: props._id
		});
	}

		return (
			<div className="note">
				{/*po kliknieciu wywolac funkcje toggleDesc()*/}
				<p onClick={toggleDesc}>{props.title}</p>
				{/*jezeli showDesc bedzie true to wtedy pokaz opis*/}
				{showDesc && (
					<div className="description">{props.body}</div>
					)}
				<button onClick={editHandler}>edytuj</button>
				<button className="delete"
				onClick={() => props.onDelete(props._id)}>usuń</button>
			</div>
		);
}

export default Note;