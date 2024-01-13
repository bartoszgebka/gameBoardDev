import {ChangeDetectionStrategy, Component, computed, Input, signal} from '@angular/core';
import {ValidationResult} from "../../interfaces/validate/validate";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [
    MatInputModule
  ],
  templateUrl: './form-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormErrorComponent {
  fieldNameInput = signal<string>('');
  validationResult = signal<ValidationResult | undefined>(undefined);
  errors = computed(() => {
    const fieldName = this.fieldNameInput();
    const errorsMessages = this.validationResult()?.errors || [];

    return errorsMessages.filter(msg => msg.fieldNameInput === fieldName);
  });

  @Input({alias: 'fieldNameInput', required: true})
  set _fieldNameInput(value: string) {
    this.fieldNameInput.set(value);
  }

  @Input({alias: 'validationResult'})
  set _validationResult(value: ValidationResult | undefined) {
    this.validationResult.set(value);
  }
}
