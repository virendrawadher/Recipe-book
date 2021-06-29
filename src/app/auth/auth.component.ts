import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthInterface } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLogin = true;
  isLoading = false;
  errors: string = '';
  @ViewChild(PlaceHolderDirective) alertHost!: PlaceHolderDirective;

  private componentSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  onSwitchToLogin() {
    this.isLogin = !this.isLogin;
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
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.errors = errorMessage;
        this.alertComponent(errorMessage);
        this.isLoading = false;
      }
    );
    authForm.reset();
  }

  onHandlerError() {
    this.errors = '';
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
  }
}
