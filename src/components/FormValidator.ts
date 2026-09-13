import type { FormValidationConfig } from "../types/types.js";

export class FormValidator {
  private config: FormValidationConfig;
  private formElement: HTMLFormElement;
  private inputElements: HTMLInputElement[];
  private submitButtonElement: HTMLButtonElement;

  constructor(
    config: FormValidationConfig,
    formElement: HTMLFormElement,
  ) {
    this.config = config;
    this.formElement = formElement;
    this.inputElements = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(
        this.config.inputSelector,
      ),
    );
    this.submitButtonElement = this.formElement.querySelector(
      this.config.submitButtonSelector,
    ) as HTMLButtonElement;
  }

  private getErrorElement(inputElement: HTMLInputElement): HTMLElement {
    return this.formElement.querySelector(
      `.${inputElement.id}-error`,
    ) as HTMLElement;
  }

  private showInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.getErrorElement(inputElement);

    inputElement.classList.add(this.config.inputErrorClass);
    inputElement.setAttribute("aria-invalid", "true");
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.config.errorClass);
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.getErrorElement(inputElement);

    inputElement.classList.remove(this.config.inputErrorClass);
    inputElement.removeAttribute("aria-invalid");
    errorElement.textContent = "";
    errorElement.classList.remove(this.config.errorClass);
  }

  private checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement);
      return;
    }

    this.hideInputError(inputElement);
  }

  private hasInvalidInput(): boolean {
    return this.inputElements.some(
      (inputElement) => !inputElement.validity.valid,
    );
  }

  private toggleButtonState(): void {
    const formHasInvalidInput = this.hasInvalidInput();

    this.submitButtonElement.disabled = formHasInvalidInput;
    this.submitButtonElement.classList.toggle(
      this.config.inactiveButtonClass,
      formHasInvalidInput,
    );
  }

  private setEventListeners(): void {
    this.inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (event: Event) => {
        const currentInput = event.currentTarget as HTMLInputElement;

        this.checkInputValidity(currentInput);
        this.toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this.toggleButtonState();
    this.setEventListeners();
  }

  public resetValidation(): void {
    this.inputElements.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });

    this.toggleButtonState();
  }
}
