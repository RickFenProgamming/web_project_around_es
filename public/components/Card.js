export class Card {
    constructor({ name, link }, templateSelector, handleCardClick) {
        this.handleLikeButtonClick = (event) => {
            const likeButton = event.currentTarget;
            likeButton.classList.toggle("card__like-button_is-active");
        };
        this.handleDeleteButtonClick = (event) => {
            const deleteButton = event.currentTarget;
            const cardElement = deleteButton.closest(".card");
            cardElement === null || cardElement === void 0 ? void 0 : cardElement.remove();
        };
        this.handleImageClick = () => {
            this.handleCardClick({
                name: this.name,
                link: this.link,
            });
        };
        this.name = name;
        this.link = link;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this.templateSelector);
        return cardTemplate.content
            .querySelector(".card")
            .cloneNode(true);
    }
    setEventListeners() {
        const cardImage = this.element.querySelector(".card__image");
        const likeButton = this.element.querySelector(".card__like-button");
        const deleteButton = this.element.querySelector(".card__delete-button");
        cardImage.addEventListener("click", this.handleImageClick);
        likeButton.addEventListener("click", this.handleLikeButtonClick);
        deleteButton.addEventListener("click", this.handleDeleteButtonClick);
    }
    generateCard() {
        this.element = this.getTemplate();
        const cardImage = this.element.querySelector(".card__image");
        const cardTitle = this.element.querySelector(".card__title");
        cardImage.src = this.link;
        cardImage.alt = this.name;
        cardTitle.textContent = this.name;
        this.setEventListeners();
        return this.element;
    }
}
