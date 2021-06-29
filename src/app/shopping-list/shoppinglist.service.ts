import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredinets.model';
@Injectable()
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  editSelectedIngrident = new Subject<number>();
  private ingredient: Ingredient[] = [new Ingredient('Apples', 10)];

  getIngredient() {
    return this.ingredient.slice();
  }

  getIngredientByIndex(index: number) {
    return this.ingredient[index];
  }

  addToIngredientList(ingredient: Ingredient) {
    this.ingredient.push(ingredient);
    this.ingredientChanged.next(this.ingredient.slice());
  }

  updateIngredient(index: number, newIngredirent: Ingredient) {
    this.ingredient[index] = newIngredirent;
    this.ingredientChanged.next(this.ingredient.slice());
  }

  addToShoppingList(ingredient: Ingredient[]) {
    this.ingredient.push(...ingredient);
    this.ingredientChanged.next(this.ingredient.slice());
  }

  deleteSelectedIngredient(index: number) {
    this.ingredient.splice(index, 1);
    this.ingredientChanged.next(this.ingredient.slice());
  }
}
