import {useContext, useState, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

function PopupEditProfile({isOpen, onClose, onEditProfile}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('Юрий Гагарин');
  const [about, setAbout] = useState('Первый человек в космосе');

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
    },[currentUser, isOpen]
  );

  function handleChangeName(evt) {
    setName(evt.target.value)
  };

  function handleChangeAbout(evt) {
    setAbout(evt.target.value)
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onEditProfile({
        name: name,
        about: about
    });
    console.log(name, about);
  };

  return (
    <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
              required
              type="text"
              id="name"
              name="name"
              className="popup__input"
              minLength="2"
              maxLength="40"
              value={name || ''}
              placeholder="Имя"
              onChange={handleChangeName}
            />
            <span id="name-error" className="error"></span>
            <input
              required
              type="text"
              id="about"
              name="about"
              className="popup__input"
              minLength="2"
              maxLength="200"
              value={about || ''}
              placeholder="О себе"
              onChange={handleChangeAbout}
            />
            <span id="about-error" className="error"></span>
          </PopupWithForm>
  );
}

export default PopupEditProfile;