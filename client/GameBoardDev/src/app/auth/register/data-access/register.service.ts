import {computed, inject, Injectable, signal} from '@angular/core';
import {RegisterState, RegisterStatus} from "../interfaces/register.state";
import {catchError, EMPTY, map, merge, Subject, switchMap} from "rxjs";
import {ValidationResult} from "../../../shared/interfaces/validate/validate";
import {RegisterDTO} from "../interfaces/register";
import {AuthService} from "../../../shared/data-access/auth.service";
import {connect} from "ngxtension/connect";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class RegisterService {
  private authService = inject(AuthService);

  private state = signal<RegisterState>({
    status: RegisterStatus.PENDING,
    validationResult: undefined
  });

  status = computed(() => this.state().status);
  validationResult = computed(() => this.state().validationResult);

  private error$ = new Subject<ValidationResult>();
  register$ = new Subject<RegisterDTO>();
  private userRegistered$ = this.register$.pipe(
    switchMap((registerDTO) => {
      return this.authService.createAccount(registerDTO).pipe(
        catchError((err: HttpErrorResponse) => {
          this.error$.next(err.error);
          return EMPTY;
        })
      )
    })
  );

  constructor() {
    const nextStep$ = merge(
      this.error$.pipe(map((validationResult) => ({status: RegisterStatus.ERROR, validationResult}))),
      this.register$.pipe(map(() => ({status: RegisterStatus.CREATING, validationResult: undefined}))),
      this.userRegistered$.pipe(map(() => ({status: RegisterStatus.SUCCESS, validationResult: undefined})))
    );

    connect(this.state).with(nextStep$);
  }
}
