import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredinets.model';
import { ShoppingListService } from '../shopping-list/shoppinglist.service';
import { Recepies } from './recepies.model';

@Injectable()
export class RecipesService {
  recipeChnaged = new Subject<Recepies[]>();

  private recipes: Recepies[] = [];
  // [
  //   new Recepies(
  //     'Test recipie',
  //     'This is test recipie',
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fmrtrending0475.jpg%3Fitok%3D-tA_cB-C&f=1&nofb=1',
  //     [new Ingredient('Potato', 5), new Ingredient('Cabbage', 10)]
  //   ),
  //   new Recepies(
  //     'Another Test recipie',
  //     'This is another test recipie',
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fmrtrending0475.jpg%3Fitok%3D-tA_cB-C&f=1&nofb=1',
  //     [new Ingredient('Watermelon', 2), new Ingredient('Pineapple', 3)]
  //   ),
  // ];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipe(recipes: Recepies[]) {
    this.recipes = recipes;
    this.recipeChnaged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeByIndex(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.addToShoppingList(ingredient);
  }

  addNewRecipe(newRecipe: Recepies) {
    this.recipes.push(newRecipe);
    this.recipeChnaged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recepies) {
    this.recipes[index] = newRecipe;
    this.recipeChnaged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChnaged.next(this.recipes.slice());
  }
}
