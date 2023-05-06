import React from 'react';
import {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupEditProfile from './PopupEditProfile';
import PopupAddPlace from './PopupAddPlace';
import PopupEditAvatar from './PopupEditAvatar';
import avatar from '../images/profile-photo.jpg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {api} from '../utils/Api';



function App() {

  const [currentUser, setCurrentUser] = useState({name: "Юрий Гагарин", about: "Первый человек в космосе", avatar: avatar});
  const [cards, setCards] = useState([]);

  const [isPopupEditProfileOpen, setIsPopupEditProfileOpen] = useState(false);
  const handleEditProfileClick = () => {
    setIsPopupEditProfileOpen(true);
  }

  const [isPopupAddPlaceOpen, setIsPopupAddPlaceOpen] = useState(false);
  const handleAddPlaceClick = () => {
    setIsPopupAddPlaceOpen(true);
  }

  const [isPopupEditAvatarOpen, setIsPopupEditAvatarOpen] = useState(false);  
  const handleEditAvatarClick = () => {
    setIsPopupEditAvatarOpen(true); 
  }

  const [lookingCard, setLookingCard] = useState(null);
  const handleCardClick = (card) => {
    setLookingCard(card);
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
  }

  function handleCardDelete(card) {
    api.deleteCardApi(card._id)
    .then((res) => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function closeAllPopups() {
    setIsPopupEditAvatarOpen(false);
    setIsPopupEditProfileOpen(false);
    setIsPopupAddPlaceOpen(false);
    setLookingCard(null); 
  }

  function handleEditProfile(data) {
    api.changeProfile(data)
    .then ((newUserInfo) => {
      console.log(newUserInfo);
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleEditAvatar(data) {
    api.changeAvatar(data)
    .then ((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlace(data) {
    api.postCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
    .then(([userInfo, cards]) => {
      setCurrentUser(userInfo);
      setCards(cards);    
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен');
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onLikeClick={handleLikeClick}
          onTrashClick={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <PopupEditProfile
          isOpen={isPopupEditProfileOpen}
          onClose={closeAllPopups}
          onEditProfile={handleEditProfile}
        />
        <PopupAddPlace 
          isOpen={isPopupAddPlaceOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <PopupEditAvatar 
          isOpen={isPopupEditAvatarOpen}
          onClose={closeAllPopups}
          onEditAvatar={handleEditAvatar}
        />                    
        <ImagePopup 
          card={lookingCard}
          onClose={closeAllPopups}
        />
            
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
