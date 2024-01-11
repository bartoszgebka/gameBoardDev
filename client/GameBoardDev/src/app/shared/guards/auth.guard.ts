import {AuthService} from "../data-access/auth.service";
import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";

export const isAuthenticatedGuard = (): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    debugger;

    if (authService.isLogged()) {
      return true;
    }

    return router.parseUrl('auth');
  };
};
