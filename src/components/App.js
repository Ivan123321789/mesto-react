import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);  
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true); 
  }

  const [lookingCard, setLookingCard] = React.useState(null);
  const handleCardClick = (card) => {
    console.log(card);
    setLookingCard(card);
  }

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const handleTrashClick = () => {
    setIsConfirmPopupOpen(true); 
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setLookingCard(null);
    setIsConfirmPopupOpen(false);   
  }
  return (  
    <div className="root">
      <Header />
      <Main 
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      onTrashClick={handleTrashClick}
      />
      <Footer />
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        buttonText='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <input
          required
          type="text"
          id="name"
          name="name"
          className="popup__input"
          minLength="2"
          maxLength="40"
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
        />
        <span id="about-error" className="error"></span>
      </PopupWithForm>
      <PopupWithForm
      name='place'
      title='Новое место'
      buttonText='Создать'
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}>
        <input
          required
          type="text"
          id="placeName"
          name="name"
          className="popup__input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
        />
        <span id="placeName-error" className="error"></span>
        <input
          required
          type="url"
          id="imageLink"
          name="link"
          className="popup__input"
          placeholder="Ссылка на изображение"
        />
        <span id="imageLink-error" className="error"></span>
      </PopupWithForm>
      <PopupWithForm
      name='avatar'
      title='Обновить аватвр'
      buttonText='Сохранить'
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}>
        <input
          required
          type="url"
          id="avatarLink"
          name="avatar"
          className="popup__input"
          placeholder="Ссылка на новый аватар"
        />
        <span id="avatarLink-error" className="error"></span>
      </PopupWithForm>
      <PopupWithForm
      name='delete'
      title='Вы уверены?'
      buttonText='Да'
      isOpen={isConfirmPopupOpen}
      onClose={closeAllPopups}>
      </PopupWithForm>        
      <ImagePopup 
      card={lookingCard}
      onClose={closeAllPopups}/>         
    </div>
  );
}

export default App;
