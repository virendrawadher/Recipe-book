import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/datastorage.service';
import { Recepies } from './recepies.model';
import { RecipesService } from './recepies.service';
import * as fromApp from '../appStore/appReducer';
import * as RecipeAction from '../recepies/recipe-store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolveService implements Resolve<Recepies[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const recipes = this.recipeService.getRecipes();
    // if (recipes.length === 0) {
    //   return this.dataStorageService.fetchData();
    // } else {
    //   return recipes;
    // }
    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => recipesState.recipes),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeAction.FetchRecipe());
          return this.actions.pipe(ofType(RecipeAction.SET_RECIPE), take(1));
        } else {
          return of(recipes);
        }
      })
    );
    console.log(new RecipeAction.FetchRecipe());
  }
}
