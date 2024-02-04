import {inject, Injectable} from '@angular/core';
import {RegisterState, RegisterStatus} from "../interfaces/register.state";
import {catchError, map, Observable, of, startWith, switchMap} from "rxjs";
import {RegisterDTO} from "../interfaces/register";
import {AuthService} from "../../../shared/data-access/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {signalSlice} from "ngxtension/signal-slice";

@Injectable()
export class RegisterService {
  private authService = inject(AuthService);

  private initialState: RegisterState = {
    status: RegisterStatus.PENDING,
    validationResult: undefined
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      register: (_state, $action: Observable<RegisterDTO>) => {
        return $action.pipe(
          switchMap((registerDTO) =>
            this.authService.createAccount(registerDTO).pipe(
              map(() => ({status: RegisterStatus.SUCCESS})),
              startWith({status: RegisterStatus.CREATING}),
              catchError((err: HttpErrorResponse) => of({status: RegisterStatus.ERROR, validationResult: err.error}))
            )
          )
        )
      }
    },
  });
}
