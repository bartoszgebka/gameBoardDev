import {AuthService} from "../data-access/auth.service";
import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {jwtDecode} from "jwt-decode";
import {MatSnackBar} from "@angular/material/snack-bar";

export const isAuthenticatedGuard = (): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const snackBar = inject(MatSnackBar);

    if (authService.isLogged()) {
      const jwt = jwtDecode(authService.getJWTToken()!);
      const currentUnixTimestamp = Math.floor(Date.now() / 1000);

      if (jwt.exp! < currentUnixTimestamp) {
        snackBar.open('Sesja wygasła', 'Zamknij', {duration: 2000});
        authService.logout();
        return router.parseUrl('auth');
      }

      return true;
    }

    return router.parseUrl('auth');
  };
};
