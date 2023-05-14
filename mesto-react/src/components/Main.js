import React from 'react';
import { api } from '../utils/API';
import Card from './Card';


function Main(props) {
	const [userName, setUserName] = React.useState('');
	const [userDescription, setUserDescription] = React.useState('');
	const [userAvatar, setUserAvatar] = React.useState('');
	const [cards, setCards] = React.useState([]);


	React.useEffect(() => {
		api
			.getUserInfo()
			.then((data) => {
				setUserName(data.name);
				setUserDescription(data.about);
				setUserAvatar(data.avatar);
			})
			.catch((err) => console.log(err));
	});

	
	React.useEffect(() => {
		api
			.getInitialCards()
      .then((data) => {
        const cards = data.map((card) => {
          return {
            link: card.link,
            name: card.name,
            likes: card.likes,
            id: card._id,
          };
        });
        setCards(cards);
      })
			.catch((err) => console.log(err))
	})


	return (
		<main className="content">
			<section className="profile">
				<div style={{ backgroundImage: `url(${userAvatar})` }} className="profile__avatar" alt="фото профиля"></div>
				<div className="profile__avatar-cover" onClick={props.onEditAvatar}></div>
				<div className="profile__info">
					<div className="profile__user">
						<h1 className="profile__name">{userName}</h1>
						<button type="button" className="profile__edit-btn" onClick={props.onEditProfile}></button>
					</div>
					<p className="profile__description">{userDescription}</p>
				</div>
				<button type="button" className="profile__add-btn" onClick={props.onAddPlace}></button>
			</section>
			<section className="elements">
			{cards.map((card) => (
                <Card
                  onCardClick={props.onCardClick}
                  card={card}
                  key={card.id}
                  src={card.link}
                  title={card.name}
                  like={card.likes}
                />
              ))}

			</section>
		</main>
	)


}

export default Main