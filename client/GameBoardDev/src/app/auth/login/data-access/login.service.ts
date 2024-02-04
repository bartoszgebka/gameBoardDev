import {inject, Injectable} from '@angular/core';
import {LoginState, LoginStatus} from "../interfaces/login.state";
import {catchError, map, Observable, of, startWith, switchMap} from "rxjs";
import {AuthenticationDTO} from "../interfaces/authentication";
import {AuthService} from "../../../shared/data-access/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {signalSlice} from "ngxtension/signal-slice";

@Injectable()
export class LoginService {
  private authService = inject(AuthService);

  private initialState: LoginState = {
    status: LoginStatus.PENDING,
    error: null
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      login: (_state, $action: Observable<AuthenticationDTO>) =>
        $action.pipe(
          switchMap((authDTO) =>
            this.authService.login(authDTO).pipe(
              map(() => ({status: LoginStatus.SUCCESS})),
              startWith({status: LoginStatus.AUTHENTICATING}),
              catchError((err: HttpErrorResponse) => {
                return of({status: LoginStatus.ERROR, error: err.error});
              })
            )
          )
        )
    }
  });
}
