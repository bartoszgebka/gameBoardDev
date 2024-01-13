import {HttpErrorResponse, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {catchError, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

export function serverErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 500 || error.status === 480) {
        snackBar.open(error.error, "Zamknij");
      }
      return throwError(() => error)
    })
  );
}
