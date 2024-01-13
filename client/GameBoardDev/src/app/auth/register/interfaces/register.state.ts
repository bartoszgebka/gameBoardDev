import {ValidationResult} from "../../../shared/interfaces/validate/validate";

export interface RegisterState {
  status: RegisterStatus;
  validationResult: ValidationResult | undefined;
}

export enum RegisterStatus {
  PENDING, CREATING, SUCCESS, ERROR
}
