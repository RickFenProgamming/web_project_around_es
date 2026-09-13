import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import {
  cardTemplateSelector,
  cardsContainerSelector,
  defaultFormConfig,
  editProfilePopupSelector,
  imagePopupSelector,
  initialCards,
  newCardPopupSelector,
} from "./utils/constants.js";
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const descriptionInput = editProfileForm.querySelector(
  ".popup__input_type_description",
);
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});
const imagePopup = new PopupWithImage(imagePopupSelector);
const createCard = (cardData) => {
  const card = new Card(cardData, cardTemplateSelector, (selectedCardData) => {
    imagePopup.open(selectedCardData);
  });
  return card.generateCard();
};
const cardsSection = new Section(
  {
    items: [...initialCards].reverse(),
    renderer: (cardData) => {
      cardsSection.addItem(createCard(cardData));
    },
  },
  cardsContainerSelector,
);
const editProfilePopup = new PopupWithForm(
  editProfilePopupSelector,
  (inputValues) => {
    const profileData = {
      name: inputValues.name,
      description: inputValues.description,
    };
    userInfo.setUserInfo(profileData);
    editProfilePopup.close();
  },
);
const newCardPopup = new PopupWithForm(newCardPopupSelector, (inputValues) => {
  const newCardData = {
    name: inputValues["place-name"],
    link: inputValues.link,
  };
  cardsSection.addItem(createCard(newCardData));
  newCardPopup.close();
});
const editProfileFormValidator = new FormValidator(
  defaultFormConfig,
  editProfileForm,
);
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();
editProfileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
editProfileButton.addEventListener("click", () => {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  descriptionInput.value = profileData.description;
  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
});
addCardButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});
cardsSection.renderItems();
