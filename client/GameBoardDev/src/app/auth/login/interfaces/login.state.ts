export interface LoginState {
  status: LoginStatus;
  error: string | null;
}

export enum LoginStatus {
  PENDING, AUTHENTICATING, SUCCESS, ERROR
}
