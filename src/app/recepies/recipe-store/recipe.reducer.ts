import { Recepies } from '../recepies.model';
import * as RecipeActions from './recipe.actions';

export interface recipeState {
  recipes: Recepies[];
}

const initialState: recipeState = {
  recipes: [],
};

export function RecipeFunction(
  state = initialState,
  action: RecipeActions.RecipeAction
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPE:
      return {
        ...state,
        recipes: action.payload,
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipeActions.UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe, index) => {
          return index === action.payload.index
            ? action.payload.newRecipe
            : recipe;
        }),
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe, index) => index !== action.payload
        ),
      };
    default:
      return state;
  }
}
