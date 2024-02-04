import {inject, Injectable} from '@angular/core';
import {AuthenticationDTO} from "../../auth/login/interfaces/authentication";
import {HttpClient} from "@angular/common/http";
import {Consts} from "../constants/consts";
import {UserDTO} from "../interfaces/user/user";
import {filter, map, merge, of, Subject, tap} from "rxjs";
import {RegisterDTO} from "../../auth/register/interfaces/register";
import {signalSlice} from "ngxtension/signal-slice";


interface AuthState {
  user: UserDTO | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private initialState: AuthState = {
    user: undefined
  }
  // sources
  private user$ = new Subject<UserDTO>();
  private userFromStorage$ = this.loadUserFromStorage();
  private logout$ = new Subject<void>();
  private sources$ = merge(
    this.userFromStorage$.pipe(map(user => ({user}))),
    this.user$.pipe(map(user => ({user}))),
    this.logout$.pipe(map(() => ({user: undefined})))
  );

  state = signalSlice({
    initialState: this.initialState,
    selectors: (state) => ({
      isLogged: () => !!state().user
    }),
    sources: [this.sources$]
  });


  private loadUserFromStorage() {
    return of(sessionStorage.getItem(Consts.SESSION_USER)).pipe(
      filter(value => !!value),
      map(value => JSON.parse(value!) as UserDTO)
    );
  }

  login(authDTO: AuthenticationDTO) {
    return this.http.post<UserDTO>(Consts.LOGIN_URL, authDTO, {observe: 'response'}).pipe(
      tap(response => sessionStorage.setItem(Consts.SESSION_TOKEN, response.headers.get("Token")!)),
      tap(response => sessionStorage.setItem(Consts.SESSION_USER, JSON.stringify(response.body))),
      map(response => response.body!),
      tap(user => this.user$.next(user))
    );
  }

  createAccount(registerDTO: RegisterDTO) {
    return this.http.post<UserDTO>(Consts.REGISTER_URL, registerDTO, {observe: 'response'}).pipe(
      tap(response => sessionStorage.setItem(Consts.SESSION_TOKEN, response.headers.get("Token")!)),
      tap(response => sessionStorage.setItem(Consts.SESSION_USER, JSON.stringify(response.body))),
      map(response => response.body!),
      tap(user => this.user$.next(user))
    );
  }

  getJWTToken() {
    return sessionStorage.getItem(Consts.SESSION_TOKEN);
  }

  logout() {
    sessionStorage.removeItem(Consts.SESSION_TOKEN);
    sessionStorage.removeItem(Consts.SESSION_USER);
    this.logout$.next();
  }
}
