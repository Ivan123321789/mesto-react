import React from 'react';

function PopupImage({card, onClose}) {
  return (
    <div className={`popup popup_open-image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <form className="popup__image-form">
          <button
            type="button"
            className="popup__close-icon"
            id="cardImageClose"
            onClick={onClose}
          ></button>
          <img
            src={card ? card.link : ''}
            alt={card ? card.name : ''}
            className="popup__image"
          />
          <h2 className="popup__subtitle-image">{card ? card.name : ''}</h2>
        </form>
      </div>
    </div>
  )
}

export default PopupImage