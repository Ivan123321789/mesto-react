import React from 'react';
import avatar from '../images/profile-photo.jpg';
import {api} from '../utils/Api';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const [userName, setUserName] = React.useState("Юрий Гагарин");
  const [userAbout, setUserAbout] = React.useState("Первый человек в космосе");
  const [userAvatar, setUserAvatar] = React.useState({avatar});
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
    .then(([userInfo, cards]) => {
      setUserName(userInfo.name);
      setUserAbout(userInfo.about);
      setUserAvatar(userInfo.avatar);
      setCards(cards);    
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен');
    });
  }, []);
  
  return (
    <main>            
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-container">
            <img
              className="profile__photo"
              src={userAvatar}
              alt="Фото профиля"
            />
            <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
          </div>
          <div className="profile__item">
            <div className="profile__info">
              <h1 className="profile__title">{userName}</h1>
              <button
                type="button"
                className="profile__edit-button"
                aria-label="Кнока редактирования профиля"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{userAbout}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Кнока добавления карточки"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
      {cards.map((card) => (
        <div className="elements__element" key={card._id}>
        <img className="elements__image" src={card.link} alt={card.name} onClick={onCardClick}/>
        <div className="elements__element-title">
          <h2 className="elements__text">{card.name}</h2>
          <div className="elements__like-container">
            <button
              className="elements__like"
              type="button"
              aria-label="Кнопка like"
            ></button>
            <span className="elements__like-counter">0</span>
          </div>
        </div>
        <button
          className="elements__delete"
          type="button"
          aria-label="Кнока Delete"
        ></button>
      </div>
      )) }
      </section>
    </main>
  )
}
export default Main