import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.setHeaders(request));
  }

  setHeaders(request: HttpRequest<any>) {

    if (!request.headers.has('Authorization')) {        

      request = request.clone({
        setHeaders: { Authorization: this.authService.getToken() },
      });
    }

    return request;
  }
}
