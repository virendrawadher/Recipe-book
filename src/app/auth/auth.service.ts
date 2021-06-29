import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface AuthInterface {
  email: string;
  localId: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  kind?: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<any>(null);
  private expireTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthInterface>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => this.handlerError(error)),
        tap((resData) =>
          this.handlerAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthInterface>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIkey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => this.handlerError(error)),
        tap((resData) =>
          this.handlerAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    clearTimeout(this.expireTimer);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _expireDate: string;
    } = JSON.parse(<any>localStorage.getItem('userData'));

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._expireDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const exTimer =
        new Date(userData._expireDate).getTime() - new Date().getTime();
      this.autoLogout(exTimer);
    }
  }

  autoLogout(expireTime: number) {
    console.log(expireTime);
    this.expireTimer = setTimeout(() => {
      this.logout();
    }, expireTime);
  }

  private handlerAuth(
    email: string,
    id: string,
    token: string,
    expireIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expireIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expireIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handlerError(errorRep: HttpErrorResponse) {
    let errorMessage = 'An unkonwn error occured';
    if (!errorRep.error || !errorRep.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRep.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exits';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exit!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is incorrect';
        break;
    }
    return throwError(errorMessage);
  }
}
