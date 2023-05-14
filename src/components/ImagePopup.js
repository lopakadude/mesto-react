import React from 'react'

function ImagePopup(props) {
	return (
		<div className={`popup popup_type_${props.name} ${props.card.link ? 'popup_opened' : ''}`}>
		<div className="popup-image__container">
			<button type="button" className="popup__close" onClick={props.onClose}></button>
			<figure className="popup-image__figure">
				<img className="popup-image__image" src={props.card.link} alt={props.card.name}/>
				<figcaption className="popup-image__name">{props.card.name}</figcaption>
			</figure>
		</div>
	</div>
	)
}

export default ImagePopup