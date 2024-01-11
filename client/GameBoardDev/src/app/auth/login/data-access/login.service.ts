import {computed, inject, Injectable, signal} from '@angular/core';
import {LoginState, LoginStatus} from "../interfaces/login.state";
import {catchError, EMPTY, map, merge, Subject, switchMap} from "rxjs";
import {AuthenticationDTO} from "../interfaces/authentication";
import {connect} from "ngxtension/connect";
import {AuthService} from "../../../shared/data-access/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class LoginService {
  private authService = inject(AuthService);
  // state
  private state = signal<LoginState>({
    status: LoginStatus.PENDING,
    error: null
  });

  // sources
  error$ = new Subject<string>();
  login$ = new Subject<AuthenticationDTO>();
  userAuthenticated$ = this.login$.pipe(
    switchMap((authDTO) =>
      this.authService.login(authDTO).pipe(
        catchError((err : HttpErrorResponse) => {
          this.error$.next(err.error);
          return EMPTY;
        })
      )
    )
  );

  // selectors
  status = computed(() => this.state().status);
  error = computed(() => this.state().error);

  constructor() {
    // reductors
    const nextStep$ = merge(
      this.error$.pipe(map((error) => ({status: LoginStatus.ERROR, error}))),
      this.login$.pipe(map(() => ({status: LoginStatus.AUTHENTICATING, error: null}))),
      this.userAuthenticated$.pipe(map(() => ({status: LoginStatus.SUCCESS, error: null})))
    );

    connect(this.state).with(nextStep$);
  }
}
