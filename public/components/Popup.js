export class Popup {
    constructor(popupSelector) {
        this.handleEscClose = (event) => {
            if (event.key === "Escape") {
                this.close();
            }
        };
        this.popupElement = document.querySelector(popupSelector);
    }
    open() {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    setEventListeners() {
        const closeButton = this.popupElement.querySelector(".popup__close");
        closeButton.addEventListener("click", () => {
            this.close();
        });
        this.popupElement.addEventListener("click", (event) => {
            if (event.target === event.currentTarget) {
                this.close();
            }
        });
    }
}
