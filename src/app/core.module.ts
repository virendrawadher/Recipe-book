import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptors } from './auth/auth-interceptor.service';
import { RecipesService } from './recepies/recepies.service';

@NgModule({
  providers: [
    RecipesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptors, multi: true },
  ],
})
export class CoreModule {}
