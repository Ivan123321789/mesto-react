import React from 'react';
import {useState, useEffect} from 'react';
import avatar from '../images/profile-photo.jpg';
import {api} from '../utils/Api';
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onTrashClick}) {
  const [userName, setUserName] = useState("Юрий Гагарин");
  const [userAbout, setUserAbout] = useState("Первый человек в космосе");
  const [userAvatar, setUserAvatar] = useState({avatar});
  const [cards, setCards] = useState([]);

  useEffect(() => {
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
          <Card
          key={card._id}
          card={card}
          onCardClick={onCardClick}
          onTrashClick={onTrashClick}/>
        ))}
      </section>
    </main>
  )
}

export default Main