import React from 'react'


function PopupWithForm(props) {
	return (
		<div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__container">
				<button onClick={props.onClose} type="button" className="popup__close"></button>
				<h2 className="popup__mission popup__mission_content_delete">{props.title}</h2>
				<form name={props.name} action="#" className="popup__form" noValidate>
					{props.children}
					<button type="submit" className="popup__submit">{props.submit}</button>
				</form>
			</div>
		</div>
	)
}

export default PopupWithForm