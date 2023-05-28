import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {
	const ref = React.useRef('');

	function handleSubmit(evt) {
		evt.preventDefault();

		props.onUpdateAvatar({
			avatar: ref.current.value,
		});
	}

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