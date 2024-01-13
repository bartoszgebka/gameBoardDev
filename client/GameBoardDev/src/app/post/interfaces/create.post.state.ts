import {ValidationResult} from "../../shared/interfaces/validate/validate";

export interface CreatePostState {
  status: CreatePostStatus
  validationResult: ValidationResult | undefined;
}

export enum CreatePostStatus {
  PENDING, CREATING, SUCCESS, ERROR
}
