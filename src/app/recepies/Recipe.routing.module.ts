import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecepiesDetailComponent } from './recepies-detail/recepies-detail.component';
import { RecepiesComponent } from './recepies.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolveService } from './recipe-resolve.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';

const router: Routes = [
  {
    path: '',
    component: RecepiesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecepiesDetailComponent,
        resolve: [RecipeResolveService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolveService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
