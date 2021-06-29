import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { RecepiesDetailComponent } from './recepies-detail/recepies-detail.component';
import { RecepiesItemComponent } from './recepies-list/recepies-item/recepies-item.component';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';
import { RecepiesComponent } from './recepies.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeRoutingModule } from './Recipe.routing.module';

@NgModule({
  declarations: [
    RecepiesComponent,
    RecepiesItemComponent,
    RecepiesListComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecepiesDetailComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
    SharedModule,
  ],
})
export class RecipesModule {}
