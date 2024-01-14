import {Routes} from "@angular/router";
import {roleCanMatchGuard} from "../shared/guards/role.can.match.guard";
import {isAuthenticatedGuard} from "../shared/guards/auth.guard";

export const POST_ROUTES: Routes = [
  {
    path: 'create',
    loadComponent: () => import("./create/create.post.component"),
    canActivate: [isAuthenticatedGuard],
    canMatch: [roleCanMatchGuard],
    data: {
      requiredAuthorities: ['ROLE_ADD_POST']
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'create'
  }
]
