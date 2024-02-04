import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {RegisterService} from "./data-access/register.service";
import {RegisterFormComponent} from "./ui/register-form/register-form.component";
import {AuthService} from "../../shared/data-access/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './register.component.html',
  providers: [RegisterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RegisterComponent {
  protected registerService = inject(RegisterService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const isLogged = this.authService.state.isLogged();
      if (isLogged) {
        this.router.navigate(["home"]);
      }
    });
  }
}
