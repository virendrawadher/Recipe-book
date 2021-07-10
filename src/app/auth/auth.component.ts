import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthInterface } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placholder.directive';

import * as AuthActions from '../auth/authStore/auth.actions';
import * as fromApp from '../appStore/appReducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogin = true;
  isLoading = false;
  errors: string = '';
  @ViewChild(PlaceHolderDirective) alertHost!: PlaceHolderDirective;

  private componentSub!: Subscription;
  private storeSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  onSwitchToLogin() {
    this.isLogin = !this.isLogin;
  }

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.errors = authState.authError;
      if (this.errors) {
        this.alertComponent(this.errors);
      }
    });
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthInterface>;
    this.isLoading = true;
    if (this.isLogin) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      // authObs = this.authService.signUp(email, password);
      this.store.dispatch(new AuthActions.SignupStart({ email, password }));
    }

    // authObs.subscribe(
    //   (resData) => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage) => {
    //     console.log(errorMessage);
    //     this.errors = errorMessage;
    //     this.alertComponent(errorMessage);
    //     this.isLoading = false;
    //   }
    // );
    authForm.reset();
  }

  onHandlerError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  alertComponent(message: string) {
    const alertCompFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostContainerRef = this.alertHost.viewContainer;
    hostContainerRef.clear();

    const componentRef = hostContainerRef.createComponent(alertCompFactory);

    componentRef.instance.message = message;
    this.componentSub = componentRef.instance.close.subscribe(() => {
      this.componentSub.unsubscribe();
      hostContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.componentSub) {
      this.componentSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
