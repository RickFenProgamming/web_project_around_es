export class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputElements = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        this.submitButtonElement = this.formElement.querySelector(this.config.submitButtonSelector);
    }
    getErrorElement(inputElement) {
        return this.formElement.querySelector(`.${inputElement.id}-error`);
    }
    showInputError(inputElement) {
        const errorElement = this.getErrorElement(inputElement);
        inputElement.classList.add(this.config.inputErrorClass);
        inputElement.setAttribute("aria-invalid", "true");
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this.config.errorClass);
    }
    hideInputError(inputElement) {
        const errorElement = this.getErrorElement(inputElement);
        inputElement.classList.remove(this.config.inputErrorClass);
        inputElement.removeAttribute("aria-invalid");
        errorElement.textContent = "";
        errorElement.classList.remove(this.config.errorClass);
    }
    checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement);
            return;
        }
        this.hideInputError(inputElement);
    }
    hasInvalidInput() {
        return this.inputElements.some((inputElement) => !inputElement.validity.valid);
    }
    toggleButtonState() {
        const formHasInvalidInput = this.hasInvalidInput();
        this.submitButtonElement.disabled = formHasInvalidInput;
        this.submitButtonElement.classList.toggle(this.config.inactiveButtonClass, formHasInvalidInput);
    }
    setEventListeners() {
        this.inputElements.forEach((inputElement) => {
            inputElement.addEventListener("input", (event) => {
                const currentInput = event.currentTarget;
                this.checkInputValidity(currentInput);
                this.toggleButtonState();
            });
        });
    }
    enableValidation() {
        this.toggleButtonState();
        this.setEventListeners();
    }
    resetValidation() {
        this.inputElements.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
        this.toggleButtonState();
    }
}
