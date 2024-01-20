import {ChangeDetectionStrategy, Component, EventEmitter, inject, input, Input, Output} from '@angular/core';
import {RegisterStatus} from "../../interfaces/register.state";
import {RegisterDTO} from "../../interfaces/register";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {ValidationResult} from "../../../../shared/interfaces/validate/validate";
import {FormErrorComponent} from "../../../../shared/components/form-error/form-error.component";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormErrorComponent
  ],
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  private fb = inject(FormBuilder);

  registerForm = this.fb.nonNullable.group({
    login: [''],
    email: [''],
    password: [''],
    confirmPassword: ['']
  });

  protected RegisterStatus = RegisterStatus;

  registerStatus = input.required<RegisterStatus>();

  validationResult =  input<ValidationResult | undefined>();

  @Output()
  register = new EventEmitter<RegisterDTO>();

  handleSubmit() {
    if (this.registerForm.valid) {
      this.register.emit(this.registerForm.getRawValue());
    }
  }
}
