import {Routes} from '@angular/router';
import {isAuthenticatedGuard} from "./shared/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.AUTH_ROUTES)
  },
  {
    path: 'home',
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () => import('./home/home.component')
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
  // TODO 404 page
];
