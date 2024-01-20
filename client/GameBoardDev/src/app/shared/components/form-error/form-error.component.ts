import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
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
  fieldNameInput = input.required<string>();
  validationResult = input<ValidationResult | undefined>();
  errors = computed(() => {
    const fieldName = this.fieldNameInput();
    const errorsMessages = this.validationResult()?.errors || [];

    return errorsMessages.filter(msg => msg.fieldNameInput === fieldName);
  });
}
