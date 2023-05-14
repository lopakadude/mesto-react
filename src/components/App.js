import React from 'react';
import Header from './Header';
import '../index.css';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({});



	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
	}
	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}


	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setSelectedCard({})
	}

	return (
		<main className="page">
			<Header />
			<Main
				onEditAvatar={handleEditAvatarClick}
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
				onCardClick={handleCardClick}
			/>
			<Footer />
			<PopupWithForm
				name="profile"
				title="Редактировать профиль"
				isOpen={isEditProfilePopupOpen}
				onClose={closeAllPopups}>
				<input type="text" id="name-input" name="name" className="popup__input popup__input_target_name"
					placeholder="Имя" required minLength="2" maxLength="40" />
				<span className="popup__input-error name-input-error"></span>
				<input type="text" id="description-input" name="about" className="popup__input popup__input_target_description"
					placeholder="Вид деятельности" required minLength="2" maxLength="200" />
				<span className="popup__input-error description-input-error">
				</span>
				<button type="submit" className="popup__submit">Сохранить</button>
			</PopupWithForm>
			<PopupWithForm
				name="newCard"
				title="Новое место"
				isOpen={isAddPlacePopupOpen}
				onClose={closeAllPopups}>
				<input type="text" id="nameOfPlace-input" className="popup__input popup__input_target_name-card" name="nameOfPlace" placeholder="Название"
					required minLength="2" maxLength="30" />
				<span className="popup__input-error nameOfPlace-input-error"></span>
				<input type="url" id="linkOfPlace-input" className="popup__input popup__input_target_link" name="link"
					placeholder="Ссылка на картинку" required />
				<span className="popup__input-error linkOfPlace-input-error"></span>
				<button type="submit" className="popup__submit popup__submit_create">Создать</button>
			</PopupWithForm>
			<PopupWithForm
				name="avatar"
				title="Обновить аватар"
				isOpen={isEditAvatarPopupOpen}
				onClose={closeAllPopups}>
				<input type="url" id="linkAvatarInput" className="popup__input popup__input-target-link-avatar" name="avatar" placeholder="Ссылка на картинку"
					required />
				<span className="popup__input-error popup__input-error_content_avatar linkAvatarInput-error"></span>
				<button type="submit" className="popup__submit">Сохранить</button>
			</PopupWithForm>
			<PopupWithForm
				name="delete"
				title="Вы уверены?"
				onClose={closeAllPopups}>
				<button type="submit" className="popup__submit">Да</button>
			</PopupWithForm>
			<ImagePopup 
			name="bigImg"
			card={selectedCard}
			onClose={closeAllPopups}
			/>
		</main>
	);
}

export default App;
