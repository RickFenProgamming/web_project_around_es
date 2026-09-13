import { Popup } from "./Popup.js";
import type { CardData } from "../types/types.js";

export class PopupWithImage extends Popup {
  private popupImage: HTMLImageElement;
  private popupCaption: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);
    this.popupImage = this.popupElement.querySelector(
      ".popup__image",
    ) as HTMLImageElement;
    this.popupCaption = this.popupElement.querySelector(
      ".popup__caption",
    ) as HTMLElement;
  }

  public open(cardData?: CardData): void {
    if (cardData) {
      this.popupImage.src = cardData.link;
      this.popupImage.alt = cardData.name;
      this.popupCaption.textContent = cardData.name;
    }

    super.open();
  }
}
