import { Action } from '@ngrx/store';
import { Recepies } from '../recepies.model';

export const SET_RECIPE = '[Recipe] Set Recipe';
export const FETCH_RECIPE = '[Recipe] Fetch Recipe';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const STORE_RECIPE = '[Recipe] Store Recipe';

export class SetRecipe implements Action {
  readonly type = SET_RECIPE;

  constructor(public payload: Recepies[]) {}
}

export class FetchRecipe implements Action {
  readonly type = FETCH_RECIPE;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recepies) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number; newRecipe: Recepies }) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class StoreRecipe implements Action {
  readonly type = STORE_RECIPE;
}

export type RecipeAction =
  | SetRecipe
  | FetchRecipe
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipe;
