import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, take } from 'rxjs/operators';

import * as fromApp from '../appStore/appReducer';

@Injectable()
export class AuthInterceptors implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.user),
      exhaustMap((user) => {
        console.log(user, 'interceptor');
        const users = JSON.parse(localStorage.getItem('userData'));
        console.log(users, 'users');
        if (!users) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', users._token),
        });
        return next.handle(modifiedReq);
      })
    );
    // return next.handle(req);
  }
}
