import type { CardData } from "../types/types.js";

export type CardClickHandler = (cardData: CardData) => void;

export class Card {
  private name: string;
  private link: string;
  private templateSelector: string;
  private handleCardClick: CardClickHandler;
  private element!: HTMLElement;

  constructor(
    { name, link }: CardData,
    templateSelector: string,
    handleCardClick: CardClickHandler,
  ) {
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  private getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector(
      this.templateSelector,
    ) as HTMLTemplateElement;

    return cardTemplate.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;
  }

  private handleLikeButtonClick = (event: MouseEvent): void => {
    const likeButton = event.currentTarget as HTMLButtonElement;

    likeButton.classList.toggle("card__like-button_is-active");
  };

  private handleDeleteButtonClick = (event: MouseEvent): void => {
    const deleteButton = event.currentTarget as HTMLButtonElement;
    const cardElement = deleteButton.closest(".card");

    cardElement?.remove();
  };

  private handleImageClick = (): void => {
    this.handleCardClick({
      name: this.name,
      link: this.link,
    });
  };

  private setEventListeners(): void {
    const cardImage = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;
    const likeButton = this.element.querySelector(
      ".card__like-button",
    ) as HTMLButtonElement;
    const deleteButton = this.element.querySelector(
      ".card__delete-button",
    ) as HTMLButtonElement;

    cardImage.addEventListener("click", this.handleImageClick);
    likeButton.addEventListener("click", this.handleLikeButtonClick);
    deleteButton.addEventListener("click", this.handleDeleteButtonClick);
  }

  public generateCard(): HTMLElement {
    this.element = this.getTemplate();

    const cardImage = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;
    const cardTitle = this.element.querySelector(
      ".card__title",
    ) as HTMLElement;

    cardImage.src = this.link;
    cardImage.alt = this.name;
    cardTitle.textContent = this.name;

    this.setEventListeners();

    return this.element;
  }
}
