export interface ValidationResult {
  errors: ErrorMessage[];
}

export interface ErrorMessage {
  message: string;
  fieldNameInput: string;
}
