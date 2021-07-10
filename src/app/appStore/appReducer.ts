import * as fromShoppingList from '../shopping-list/shopping-list-store/shopping-list.reducer';
import * as fromAuth from '../auth/authStore/auth.reducer';
import * as fromRecipe from '../recepies/recipe-store/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.ShoppingListState;
  auth: fromAuth.AuthState;
  recipes: fromRecipe.recipeState;
}

export const appReducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.ShoppingListReducer,
  auth: fromAuth.AuthReducer,
  recipes: fromRecipe.RecipeFunction,
};
