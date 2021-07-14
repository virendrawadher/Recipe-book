import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

import * as AuthActions from './auth.actions';

export interface AuthInterface {
  email: string;
  localId: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  kind?: string;
  registered?: boolean;
}

const hanldeAuthentication = (
  email: string,
  localId: string,
  expiresIn: number,
  idToken: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, localId, idToken, expirationDate);
  const isUser = !!user;
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    id: localId,
    token: idToken,
    expirationDate,
    redirect: true,
  });
};

const handleError = (errorRep: any) => {
  let errorMessage = 'An unkonwn error occured';
  if (!errorRep.error || !errorRep.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
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
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  authSignup = createEffect<any, any, any, any>(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupData: AuthActions.SignupStart) => {
        return this.http
          .post<AuthInterface>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`,
            {
              email: signupData.payload.email,
              password: signupData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogout(+resData.expiresIn * 1000);
            }),
            map((signupData) => {
              return hanldeAuthentication(
                signupData.email,
                signupData.localId,
                +signupData.expiresIn,
                signupData.idToken
              );
            }),
            catchError((error) => {
              return handleError(error);
            })
          );
      })
    );
  });

  authLogin = createEffect<any, any, any, any>(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthInterface>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIkey}`,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogout(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return hanldeAuthentication(
                resData.email,
                resData.localId,
                +resData.expiresIn,
                resData.idToken
              );
            }),
            catchError((errorRep) => {
              return handleError(errorRep);
            })
          );
      })
    );
  });

  authSuccessOrLogout = createEffect<any, any, any, any>(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authStateActions: AuthActions.AuthenticateSuccess) => {
          if (authStateActions.payload.redirect) {
            this.router.navigate(['/recipes']);
          }
        })
      );
    },
    { dispatch: false }
  );

  authAutoLogin = createEffect<any, any, any, any>(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log(userData, 'user data');
        if (!userData) {
          return { type: 'DUMMY' };
        }
        const exTimer =
          new Date(userData._expireDate).getTime() - new Date().getTime();
        this.authService.setLogout(exTimer);

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._expireDate)
        );

        if (loadedUser.token) {
          return new AuthActions.AuthenticateSuccess({
            email: loadedUser.email,
            id: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._expireDate),
            redirect: false,
          });
        }
        return { type: 'DUMMY' };
      })
    );
  });

  autoLogout = createEffect(
    (): any => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
