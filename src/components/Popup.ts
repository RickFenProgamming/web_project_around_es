export class Popup {
  protected popupElement: HTMLElement;

  constructor(popupSelector: string) {
    this.popupElement = document.querySelector(
      popupSelector,
    ) as HTMLElement;
  }

  private handleEscClose = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  public open(): void {
    this.popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  public close(): void {
    this.popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  public setEventListeners(): void {
    const closeButton = this.popupElement.querySelector(
      ".popup__close",
    ) as HTMLButtonElement;

    closeButton.addEventListener("click", () => {
      this.close();
    });

    this.popupElement.addEventListener("click", (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}
