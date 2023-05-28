import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
	const [name, setName] = React.useState('');
	const [link, setLink] = React.useState('');

	function handleChangeName(evt) {
		setName(evt.target.value);
	}

	function handleChangeLink(evt) {
		setLink(evt.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();

		props.onAddPlace({
			name,
			link
		})


	}

	return (
		<PopupWithForm
			name="newCard"
			title="Новое место"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			submit="Создать">
			<input
				type="text"
				onChange={handleChangeName}
				value={name}
				id="nameOfPlace-input"
				className="popup__input popup__input_target_name-card" name="nameOfPlace"
				placeholder="Название"
				required minLength="2" maxLength="30" />
			<span
				className="popup__input-error nameOfPlace-input-error">
			</span>
			<input
				type="url"
				onChange={handleChangeLink}
				value={link}
				id="linkOfPlace-input"
				className="popup__input popup__input_target_link"
				name="link"
				placeholder="Ссылка на картинку" required />
			<span className="popup__input-error linkOfPlace-input-error"></span>
		</PopupWithForm>
	)
}

export default AddPlacePopup