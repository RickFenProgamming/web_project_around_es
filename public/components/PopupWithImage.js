import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.popupImage = this.popupElement.querySelector(".popup__image");
        this.popupCaption = this.popupElement.querySelector(".popup__caption");
    }
    open(cardData) {
        if (cardData) {
            this.popupImage.src = cardData.link;
            this.popupImage.alt = cardData.name;
            this.popupCaption.textContent = cardData.name;
        }
        super.open();
    }
}
