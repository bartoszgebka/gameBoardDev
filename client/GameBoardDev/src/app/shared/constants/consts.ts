import {environment} from "../../../environments/environment";

export const Consts = {
  SESSION_TOKEN: "JWT-TOKEN",
  SESSION_USER: "USER",

  // urls
  LOGIN_URL: `${environment.apiUrl}/auth/authenticate`,
  REGISTER_URL: `${environment.apiUrl}/auth/register`,
  ADD_POST_URL: `${environment.apiUrl}/posts`,
  LIST_POST_URL: `${environment.apiUrl}/posts`
}
