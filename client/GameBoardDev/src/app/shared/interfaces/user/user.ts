export interface UserDTO {
  login: string;
  email: string;
  authorities: AuthorityDTO[];
}

export interface AuthorityDTO {
  name: string;
}
