import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useState } from 'react';

function EditProfilePopup(props) {
	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState(currentUser.name);
	const [description, setDescription] = useState(currentUser.about);

	React.useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, props.isOpen]);

	function handleChangeName(evt) {
		setName(evt.target.value);
	}

	function handleChangeAbout(evt) {
		setDescription(evt.target.value);
	}

	function handleSubmit(evt) {
		evt.preventDefault();

		props.onUpdateUser({
			name,
			about: description,
		});
	}

	return (
		<PopupWithForm
			name="profile"
			title="Редактировать профиль"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			submit="Сохранить">
			<input
				type="text"
				id="name-input"
				name="name"
				className="popup__input popup__input_target_name"
				placeholder="Имя"
				required minLength="2" maxLength="40"
				onChange={handleChangeName}
				value={name || ''} />
			<span className="popup__input-error name-input-error"></span>
			<input
				type="text"
				id="description-input"
				name="about"
				className="popup__input popup__input_target_description"
				placeholder="Вид деятельности"
				required minLength="2" maxLength="200"
				onChange={handleChangeAbout}
				value={description || ''} />
			<span className="popup__input-error description-input-error">
			</span>
		</PopupWithForm>
	)
}

export default EditProfilePopup