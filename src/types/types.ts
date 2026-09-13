export interface CardData {
  name: string;
  link: string;
}

export interface UserInfoData {
  name: string;
  description: string;
}

export interface UserInfoSelectors {
  nameSelector: string;
  descriptionSelector: string;
}

export interface FormValidationConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export type FormInputValues = Record<string, string>;
