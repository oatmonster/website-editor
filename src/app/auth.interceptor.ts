import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( public authService: AuthService ) { }

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    request = request.clone( {
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    } );
    return next.handle( request ).pipe( catchError( err => {
      if ( err instanceof HttpErrorResponse && err.status === 401 ) {
        this.authService.refreshToken();
      }
      return throwError( err );
    } ) );
  }
}