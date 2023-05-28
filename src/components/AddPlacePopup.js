import React from "react";
import { useState,useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
	const [name, setName] = useState('');
	const [link, setLink] = useState('');

	function handleChangeName(evt) {
		setName(evt.target.value);
	}

	function handleChangeLink(evt) {
		setLink(evt.target.value);
	}

	function handleSubmit(evt) {
		evt.preventDefault();

    props.onAddPlace({
      name,
      link
    })
  }

	useEffect(() => {
    if (!props.isOpen) {
      setName('');
      setLink('');
    } 
  }, [props.isOpen]);

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