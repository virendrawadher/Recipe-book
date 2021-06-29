import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredinets.model';
import { ShoppingListService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients!: Ingredient[];

  ingredientChange!: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingridients = this.shoppingListService.getIngredient();
    this.ingredientChange =
      this.shoppingListService.ingredientChanged.subscribe(
        (ingridients: Ingredient[]) => {
          this.ingridients = ingridients;
        }
      );
  }

  onEditIngrident(index: number) {
    this.shoppingListService.editSelectedIngrident.next(index);
  }

  ngOnDestroy() {
    this.ingredientChange.unsubscribe();
  }
}
