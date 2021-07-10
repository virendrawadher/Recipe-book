import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recepies } from '../recepies.model';
import * as RecipeAction from '../recipe-store/recipe.actions';
import * as fromApp from '../../appStore/appReducer';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  fetchRecipe = createEffect((): any => {
    return this.actions$.pipe(
      ofType(RecipeAction.FETCH_RECIPE),
      switchMap(() => {
        return this.http.get<Recepies[]>(
          'https://recipebook-e0431-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
        );
      }),
      map((recipe) => {
        return recipe.map((reci) => {
          return {
            ...reci,
            ingredients: reci.ingredients ? reci.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return new RecipeAction.SetRecipe(recipes);
      })
    );
  });

  storeRecipe = createEffect((): any => {
    return this.actions$.pipe(
      ofType(RecipeAction.STORE_RECIPE),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionState, recipeState]) => {
        return this.http.put(
          'https://recipebook-e0431-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
          recipeState.recipes
        );
      })
    );
  });
}
