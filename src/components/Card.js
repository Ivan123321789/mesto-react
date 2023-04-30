import React from 'react';

function Card(props) {

  function handleClick() {
     props.onCardClick(props.card);    
  }
  return (
    <div className="elements__element" key={props.card._id}>
      <img className="elements__image" onClick={handleClick}
      src={props.card.link} alt={props.card.name} />
      <div className="elements__element-title">
        <h2 className="elements__text">{props.card.name}</h2>
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
        onClick={props.onTrashClick}
      ></button>
    </div>
  )
}
export default Card;