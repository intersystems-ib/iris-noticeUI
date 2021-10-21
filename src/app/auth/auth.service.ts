import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Backend API used to login. We can use any URL that will enforce an IRIS Basic Auth */
  authApiUrl: string = environment.urlBaseForms + '/info/Notice.DAT.Subscriber';

  /** isLoginSubject is used to know if the user is logged in or not */
  isLoginSubject = new BehaviorSubject<boolean>(this.authenticated());

  /** private user token */
  private _token: BehaviorSubject<string> = new BehaviorSubject<string>(""); // En otros proyectos tiene null en vez de "" y no casca

  constructor(private http: HttpClient, private router: Router) {

    document.execCommand('ClearAuthenticationCache', false);

    this._token
      .asObservable()
      .subscribe(
        token => {
          // user token changed. 
          // you can grab user data from server (e.g. info, preferences) 
        } 
      );
  }

  public login(username: string, password: string): Observable<string> {

    let basicheader = btoa(encodeURI(username + ":" + password));

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + basicheader);
    headers = headers.set('Cache-Control', 'no-cache');

    return this.http
      .get<any>(
        this.authApiUrl,
        {headers}
      ).
      pipe(
        map(data => {
          
          let token = `Basic ${basicheader}`;
          localStorage.setItem(environment.authLocalStorageKey, JSON.stringify({ username, token }));
          
          this._token.next(token);
          setTimeout(() => {
            this.isLoginSubject.next(true);
          });
          
          return username;
        }),
        catchError(err => {
          
          this.logout();
          return throwError(err);
        })
      );
  }

  public logout(): void {

    localStorage.removeItem(environment.authLocalStorageKey);

    setTimeout(() => {
      this.isLoginSubject.next(false);
    });
  }

  public authenticated(): boolean {

    const currentUser = JSON.parse(localStorage.getItem(environment.authLocalStorageKey) || '{}');

    const token = currentUser && currentUser.token;
    if (token) {

      if (this._token) {
        this._token.next(token);
      }

      return true;
    }

    return false;
  }

  getToken(): string {

    const currentUser = JSON.parse(localStorage.getItem(environment.authLocalStorageKey) || '{}');

    const token = currentUser && currentUser.token;
    return token;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
}
