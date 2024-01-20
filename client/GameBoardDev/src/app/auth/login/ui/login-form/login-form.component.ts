import {ChangeDetectionStrategy, Component, EventEmitter, inject, input, Input, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationDTO} from "../../interfaces/authentication";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {LoginStatus} from "../../interfaces/login.state";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDividerModule} from "@angular/material/divider";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    JsonPipe
  ],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  protected loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  protected LoginStatus = LoginStatus;

  loginStatus = input.required<LoginStatus>();

  error = input<string | null>();

  @Output()
  authentication = new EventEmitter<AuthenticationDTO>();

  handleSubmit() {
    if (this.loginForm.valid) {
      this.authentication.emit(this.loginForm.getRawValue());
    }
  }
}
