import * as fromShoppingList from '../shopping-list/shopping-list-store/shopping-list.reducer';
import * as fromAuth from '../auth/authStore/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.ShoppingListState;
  auth: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.ShoppingListReducer,
  auth: fromAuth.AuthReducer,
};
