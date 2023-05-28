import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from 'react';

function EditAvatarPopup(props) {
	const ref = useRef(null);
	function handleSubmit(evt) {
		evt.preventDefault();
		props.onUpdateAvatar({
			avatar: ref.current.value,
		});
	}

	useEffect(() => {
      ref.current.value = '';
  }, [props.isOpen]);

	return (
		<PopupWithForm
			name="avatar"
			title="Обновить аватар"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			submit="Сохранить">
			<input
				ref={ref}
				type="url"
				id="linkAvatarInput"
				className="popup__input popup__input-target-link-avatar"
				name="avatar"
				placeholder="Ссылка на картинку"
				required />
			<span
				className="popup__input-error popup__input-error_content_avatar linkAvatarInput-error">
			</span>
		</PopupWithForm>
	)
}

export default EditAvatarPopup