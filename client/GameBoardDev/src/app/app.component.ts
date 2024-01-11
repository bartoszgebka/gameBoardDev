import {Component, effect, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "./shared/data-access/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './app.component.html',
  styles: [
    `
    .container {
      margin-top: 2rem;
      max-width: 1000px;
      margin-inline: auto;
    }
    `
  ]
})
export class AppComponent {
  protected authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const isLogged = this.authService.isLogged();
      if(!isLogged) {
        this.router.navigate(["auth"]);
      }
    })
  }
}
