'use strict';

const sliderItems = document.querySelectorAll('.slider-item');
const sliderBtns = document.querySelectorAll('.slider-button');
const sliderBtnsContainer = document.querySelector('.slider-buttons-container');

const writeUsModal = document.querySelector('.modal-write-us');
const writeUsBtn = document.querySelector('.write-us-button');

let modalCloseBtn;

const setListenerForSlider = function (items, buttons, container) {
  if (items && container && buttons) {
    container.addEventListener('click', function(evt) {
      for (let i = 0; i < buttons.length; i++) {
        if (evt.target === buttons[i]) {
          evt.preventDefault();
          for(let j = 0; j < buttons.length; j++) {
            buttons[j].classList.remove('slider-button-current');
            items[j].classList.remove('slider-item-current');
          }
          buttons[i].classList.add('slider-button-current');
          items[i].classList.add('slider-item-current');
        }
      }
    });
  }
};

const setListenerForModal = function (modal, button) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.add('modal-current');
    modalCloseBtn = modal.querySelector('.modal-close');
    modalCloseBtn.addEventListener('click', function(evt) {
      evt.preventDefault();
      modal.classList.remove('modal-current');
      modal.classList.remove('modal-error');
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        modal.classList.remove('modal-current');
        modal.classList.remove('modal-error');
      }
    });

    setHandlerForForm(modal);
  });
};

const setHandlerForForm = function (modal) {

  const writeUsForm = modal.querySelector('.write-us-form');
  const nameInput = modal.querySelector('.write-us-name');
  const emailInput = modal.querySelector('.write-us-email');
  const textareaInput = modal.querySelector('.write-us-textarea');

  let isStorageSupport = true;
  let storageName;
  let storageEmail;

  try {
    storageName = localStorage.getItem('name');
    storageEmail = localStorage.getItem('email');
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageName && storageEmail) {
    nameInput.value = storageName;
    emailInput.value = storageEmail;
    textareaInput.focus();
  } else {
    nameInput.focus();
  }

  writeUsForm.addEventListener('submit', function (evt) {
    if (!nameInput.value || !emailInput.value || !textareaInput.value) {
      evt.preventDefault();
      modal.classList.remove('modal-error');
      void modal.offsetWidth;
      modal.classList.add('modal-error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', nameInput.value);
        localStorage.setItem('email', emailInput.value);
      }
    }
  });
};

setListenerForSlider(sliderItems, sliderBtns, sliderBtnsContainer);
setListenerForModal(writeUsModal, writeUsBtn);
