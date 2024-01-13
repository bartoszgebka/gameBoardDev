import {CanMatchFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../data-access/auth.service";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {MatSnackBar} from "@angular/material/snack-bar";

export const roleCanMatchGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const matSnackBar = inject(MatSnackBar);

  const jwt = jwtDecode<JwtPayload & { authorities: string[] }>(authService.getJWTToken()!);
  const {authorities} = jwt;
  const requiredAuthorities = route.data!['requiredAuthorities'] as string[];

  const hasRequiredAuthorities = authorities.some(a => requiredAuthorities.includes(a));

  if (!hasRequiredAuthorities) {
    matSnackBar.open("Brak wymaganego uprawnienia", "Zamknij", {duration: 2000});
    return false;
  }


  return true;
};
