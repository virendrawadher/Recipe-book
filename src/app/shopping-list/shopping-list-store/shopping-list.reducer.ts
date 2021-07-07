import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredinets.model';
import * as shoppingListAction from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apple', 10), new Ingredient('Watermelon', 20)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function ShoppingListReducer(
  state = initialState,
  action: shoppingListAction.ShoppingListActions
) {
  switch (action.type) {
    case shoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payloads],
      };
    case shoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case shoppingListAction.UPDATE_INGREDIENT:
      // state.ingredients[action.payload.index] = action.payload.newIngredient
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient, i) => {
          return state.editedIngredientIndex === i
            ? action.payload
            : ingredient;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case shoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return state.editedIngredientIndex !== igIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case shoppingListAction.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case shoppingListAction.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    default:
      return state;
  }
}
