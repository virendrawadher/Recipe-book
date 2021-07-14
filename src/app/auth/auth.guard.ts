import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import * as fromApp from '../appStore/appReducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  isAuth!: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.user),
      map((user) => {
        const isAuth = JSON.parse(localStorage.getItem('isUser'));
        console.log(isAuth, 'isAuth');
        if (isAuth) {
          return true;
        } else {
          console.log(this.router.createUrlTree(['/auth']));
          return this.router.createUrlTree(['/auth']);
        }
        // return false;
      })
    );
  }
}
