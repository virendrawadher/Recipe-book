import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recepies } from '../recepies/recepies.model';
import { RecipesService } from '../recepies/recepies.service';
import * as RecipeActions from '../recepies/recipe-store/recipe.actions';
import * as fromApp from '../appStore/appReducer';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService,
    private store: Store<fromApp.AppState>
  ) {}

  saveData() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipebook-e0431-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((data) => console.log(data));
  }

  fetchData() {
    return this.http
      .get<Recepies[]>(
        'https://recipebook-e0431-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          // this.recipeService.setRecipe(recipes);
          this.store.dispatch(new RecipeActions.SetRecipe(recipes));
        })
      );
  }
}
