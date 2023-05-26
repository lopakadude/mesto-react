import React from 'react';
import Header from './Header';
import '../index.css';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/API';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({});
	const [currentUser, setCurrentUser] = React.useState({});
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		api
			.getUserInfo()
			.then((data) => {
				setCurrentUser(data);
			})
			.catch((err) => console.log(`Ошибка: ${err}`));
	}, []);

	React.useEffect(() => {
		api
			.getInitialCards()
			.then((data) => {
				const cards = data.map((card) => {
					return {
						link: card.link,
						name: card.name,
						likes: card.likes,
						_id: card._id,
						owner: card.owner
					};
				});
				setCards(cards);
			})
			.catch((err) => console.log(`Ошибка: ${err}`))
	}, [])



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

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);

		api.changeLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
			})
			.catch((err) => console.log(`Ошибка: ${err}`));
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id)
			.then(res => {
				setCards((state) => state.filter((c) => c._id !== card._id));
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
	}

	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setSelectedCard({})
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<main
				className="page"
			>
				<Header />
				<Main
					onEditAvatar={handleEditAvatarClick}
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
					cards={cards}
				/>
				<Footer />
				<PopupWithForm
					name="profile"
					title="Редактировать профиль"
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					submit="Сохранить">
					<input type="text" id="name-input" name="name" className="popup__input popup__input_target_name"
						placeholder="Имя" required minLength="2" maxLength="40" />
					<span className="popup__input-error name-input-error"></span>
					<input type="text" id="description-input" name="about" className="popup__input popup__input_target_description"
						placeholder="Вид деятельности" required minLength="2" maxLength="200" />
					<span className="popup__input-error description-input-error">
					</span>
				</PopupWithForm>
				<PopupWithForm
					name="newCard"
					title="Новое место"
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					submit="Создать">
					<input type="text" id="nameOfPlace-input" className="popup__input popup__input_target_name-card" name="nameOfPlace" placeholder="Название"
						required minLength="2" maxLength="30" />
					<span className="popup__input-error nameOfPlace-input-error"></span>
					<input type="url" id="linkOfPlace-input" className="popup__input popup__input_target_link" name="link"
						placeholder="Ссылка на картинку" required />
					<span className="popup__input-error linkOfPlace-input-error"></span>
				</PopupWithForm>
				<PopupWithForm
					name="avatar"
					title="Обновить аватар"
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					submit="Сохранить">
					<input type="url" id="linkAvatarInput" className="popup__input popup__input-target-link-avatar" name="avatar" placeholder="Ссылка на картинку"
						required />
					<span className="popup__input-error popup__input-error_content_avatar linkAvatarInput-error"></span>
				</PopupWithForm>
				<PopupWithForm
					name="delete"
					title="Вы уверены?"
					onClose={closeAllPopups}
					submit="Да">
				</PopupWithForm>
				<ImagePopup
					name="bigImg"
					card={selectedCard}
					onClose={closeAllPopups}
				/>
			</main>
		</CurrentUserContext.Provider>
	);
}

export default App;
