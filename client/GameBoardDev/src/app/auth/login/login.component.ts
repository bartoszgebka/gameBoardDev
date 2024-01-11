import {Component, effect, inject} from '@angular/core';
import {LoginService} from "./data-access/login.service";
import {LoginFormComponent} from "./ui/login-form/login-form.component";
import {AuthService} from "../../shared/data-access/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginFormComponent
  ],
  templateUrl: './login.component.html',
  providers: [LoginService]
})
export default class LoginComponent {
  protected loginService = inject(LoginService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const isLogged = this.authService.isLogged();
      if(isLogged) {
        this.router.navigate(["home"]);
      }
    });
  }
}
