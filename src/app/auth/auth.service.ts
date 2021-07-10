import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../appStore/appReducer';
import * as fromAuth from './authStore/auth.actions';

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
  private expireTimer: any;
  constructor(private store: Store<fromApp.AppState>) {}

  setLogout(expireTime: number) {
    console.log(expireTime);
    this.expireTimer = setTimeout(() => {
      this.store.dispatch(new fromAuth.Logout());
    }, expireTime);
  }

  clearLogout() {
    clearTimeout(this.expireTimer);
    this.expireTimer = null;
  }
}
