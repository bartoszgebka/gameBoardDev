import {computed, inject, Injectable, signal} from '@angular/core';
import {AuthenticationDTO} from "../../auth/login/interfaces/authentication";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Consts} from "../constants/consts";
import {UserDTO} from "../interfaces/user/user";
import {filter, map, merge, of, Subject, tap} from "rxjs";
import {connect} from "ngxtension/connect";


interface AuthState {
  user: UserDTO | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  // state
  private state = signal<AuthState>({
    user: undefined
  });

  // sources
  private user$ = new Subject<UserDTO>();
  private userFromStorage$ = this.loadUserFromStorage();

  // selectors
  user = computed(() => this.state().user);
  isLogged = computed(() => !!this.state().user)

  constructor() {
    const nextStep$ = merge(
      this.userFromStorage$.pipe(map(user => ({user}))),
      this.user$.pipe(map(user => ({user})))
    );
    connect(this.state).with(nextStep$);
  }

  private loadUserFromStorage() {
    return of(sessionStorage.getItem(Consts.SESSION_USER)).pipe(
      filter(value => !!value),
      map(value => JSON.parse(value!) as UserDTO)
    );
  }

  login(authDTO: AuthenticationDTO) {
    const loginURL = `${environment.apiUrl}${Consts.LOGIN_URL}`;
    return this.http.post<UserDTO>(loginURL, authDTO, {observe: 'response'}).pipe(
      tap(response => sessionStorage.setItem(Consts.SESSION_TOKEN, response.headers.get("Token")!)),
      tap(response => sessionStorage.setItem(Consts.SESSION_USER, JSON.stringify(response.body))),
      map(response => response.body!),
      tap(user => this.user$.next(user))
    );
  }

  logout() {
    sessionStorage.removeItem("JWT-TOKEN");
    sessionStorage.removeItem("USER");
    this.state.update((state) => ({...state, user: undefined}));
  }
}
