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

// Sprint anterior
initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsList);
});

// =======================
// Elementos del DOM
// =======================

const editProfileButton = document.querySelector(".profile__edit-button");

const editProfilePopup = document.querySelector("#edit-popup");

const editProfileCloseButton = editProfilePopup.querySelector(".popup__close");

const profileForm = document.querySelector("#edit-profile-form");

const nameInput = profileForm.querySelector(".popup__input_type_name");

const descriptionInput = profileForm.querySelector(
  ".popup__input_type_description",
);

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

const cardsList = document.querySelector(".cards__list");

const cardTemplate = document.querySelector("#card-template").content;

// =======================
// Funciones reutilizables
// =======================

const addCardButton = document.querySelector(".profile__add-button");

const newCardPopup = document.querySelector("#new-card-popup");

const newCardCloseButton = newCardPopup.querySelector(".popup__close");

const newCardCloseButton = newCardPopup.querySelector(".popup__close");

const newCardForm = document.querySelector("#new-card-form");

const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");

const cardUrlInput = newCardForm.querySelector(".popup__input_type_url");

const newCardForm = document.querySelector("#new-card-form");

const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");

const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

// =========================
// Nuevos elementos del DOM
// =========================

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// =======================
// Funciones del perfil
// =======================

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfilePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editProfilePopup);
}

// =======================
// Eventos
// =======================

editProfileButton.addEventListener("click", handleOpenEditModal);

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfilePopup);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", handleOpenNewCardModal);

newCardCloseButton.addEventListener("click", function () {
  closeModal(newCardPopup);
});

function getCardElement({
  name = "Sin título",
  link = "./images/placeholder.jpg",
}) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
}

function renderCard(name, link, container) {
  const card = getCardElement({ name, link });

  container.prepend(card);
}

function handleOpenNewCardModal() {
  openModal(newCardPopup);
}
