import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { DataStorageService } from '../shared/datastorage.service';
import { Recepies } from './recepies.model';
import { RecipesService } from './recepies.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolveService implements Resolve<Recepies[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipesService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchData();
    } else {
      return recipes;
    }
  }
}
