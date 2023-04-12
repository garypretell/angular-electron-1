import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  route = inject(ActivatedRoute);
  router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    req = req.clone({
      headers: req.headers.set('Authorization', 'Basic ' + btoa('demo:demo')),
    });
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
    });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          console.log('ERROR 401 UNAUTHORIZED');
        }
        const err = error.error.message || error.statusText;
        return throwError(() => error);
      })
    );
  }
}
