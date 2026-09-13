import { Popup } from "./Popup.js";
import type { FormInputValues } from "../types/types.js";

export type FormSubmitHandler = (inputValues: FormInputValues) => void;

export class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private inputElements: HTMLInputElement[];
  private handleFormSubmit: FormSubmitHandler;

  constructor(
    popupSelector: string,
    handleFormSubmit: FormSubmitHandler,
  ) {
    super(popupSelector);
    this.formElement = this.popupElement.querySelector(
      ".popup__form",
    ) as HTMLFormElement;
    this.inputElements = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(
        ".popup__input",
      ),
    );
    this.handleFormSubmit = handleFormSubmit;
  }

  private getInputValues(): FormInputValues {
    const inputValues: FormInputValues = {};

    this.inputElements.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value;
    });

    return inputValues;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener(
      "submit",
      (event: SubmitEvent) => {
        event.preventDefault();
        this.handleFormSubmit(this.getInputValues());
      },
    );
  }

  public close(): void {
    super.close();
    this.formElement.reset();
  }
}
