import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, children, buttonText}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__content">
        <form className={`popup__form popup__form_${name}`} name={`${name}-form`} noValidate>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            className="popup__button-submit"
            aria-label="Кнопка сохранения"
            >{buttonText}</button>
          <button
            type="button"
            className="popup__close-icon"
            aria-label="Кнопка закрытия"
            onClick={onClose}
          ></button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm