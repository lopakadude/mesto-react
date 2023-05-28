import React from 'react';
import Header from './Header';
import '../index.css';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/API';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

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

	function handleUpdateUser({ name, about }) {
		api.setUserInfo({ name: name, about: about })
			.then((res) => {
				setCurrentUser(res)
				closeAllPopups()
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
	}

	function handleUpdateAvatar(avatar) {
		api.setChangeAvatar(avatar)
			.then((res) => {
				setCurrentUser(res)
				closeAllPopups()
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
	}

	function handleAddPlaceSubmit({name, link}) {
		api.postNewCard({name, link})
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups()
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
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}>
				</AddPlacePopup>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar} />
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
