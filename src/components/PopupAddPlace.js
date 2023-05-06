import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function PopupAddPlace({isOpen, onClose, onAddPlace}) {
  const [name, setPlaceName] = useState('');
  const [link, setLink] = useState('');

  function handleChangePlaceName(evt) {
    setPlaceName(evt.target.value)
  };

  function handleChangePlaceLink(evt) {
    setLink(evt.target.value)
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({name, link});
  };

  useEffect(() => {
    setPlaceName('');
    setLink('');
  }, [isOpen]);
  
  return (
    <PopupWithForm
    name='place'
    title='Новое место'
    buttonText='Создать'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>
      <input
        required
        type="text"
        id="placeName"
        name="name"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name || ''} 
        onChange={handleChangePlaceName}
      />
      <span id="placeName-error" className="error"></span>
      <input
        required
        type="url"
        id="imageLink"
        name="link"
        className="popup__input"
        placeholder="Ссылка на изображение"
        value={link || ''} 
        onChange={handleChangePlaceLink}
      />
      <span id="imageLink-error" className="error"></span>
    </PopupWithForm>
  )
}
export default PopupAddPlace;