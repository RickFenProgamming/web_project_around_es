import { resetValidation, setEventListeners } from "./validate.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editProfilePopup = document.querySelector("#edit-popup");
const newCardPopup = document.querySelector("#new-card-popup");
const imagePopup = document.querySelector("#image-popup");
const popupList = document.querySelectorAll(".popup");

const profileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const descriptionInput = profileForm.querySelector(
  ".popup__input_type_description",
);
const cardNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

function handleEscapeKeydown(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKeydown);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKeydown);

  const formElement = modal.querySelector(validationConfig.formSelector);

  if (formElement) {
    resetValidation(formElement, validationConfig);
  }
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

function handleCloseButtonClick(event) {
  const popup = event.currentTarget.closest(".popup");
  closeModal(popup);
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(profileForm, validationConfig);
  openModal(editProfilePopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editProfilePopup);
}

function handleOpenNewCardModal() {
  newCardForm.reset();
  resetValidation(newCardForm, validationConfig);
  openModal(newCardPopup);
}

function handleLikeButtonClick(event) {
  event.currentTarget.classList.toggle("card__like-button_is-active");
}

function handleDeleteButtonClick(event) {
  const cardElement = event.currentTarget.closest(".card");
  cardElement.remove();
}

function handleCardImageClick(event) {
  const cardImage = event.currentTarget;

  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;

  openModal(imagePopup);
}

function getCardElement({
  name = "Sin título",
  link = "./images/placeholder.jpg",
}) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", handleLikeButtonClick);
  deleteButton.addEventListener("click", handleDeleteButtonClick);
  cardImage.addEventListener("click", handleCardImageClick);

  return cardElement;
}

function renderCard(cardData, container) {
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  renderCard(newCard, cardsList);
  newCardForm.reset();
  closeModal(newCardPopup);
}

popupList.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener("click", handleCloseButtonClick);
  popup.addEventListener("click", handleOverlayClick);
});

editProfileButton.addEventListener("click", handleOpenEditModal);
addCardButton.addEventListener("click", handleOpenNewCardModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleCardFormSubmit);

setEventListeners(validationConfig);

[...initialCards].reverse().forEach((cardData) => {
  renderCard(cardData, cardsList);
});
