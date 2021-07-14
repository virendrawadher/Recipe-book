import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';

import * as fromApp from './appStore/appReducer';
import * as AuthAction from './auth/authStore/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platFormId
  ) {}

  ngOnInit() {
    // this.authService.autoLogin();
    if (isPlatformBrowser(this.platFormId)) {
      console.log(this.platFormId, 'platFormId');
      this.store.dispatch(new AuthAction.AutoLogin());
    }
    console.log('Hello from app component ngOnInit');
  }
}
