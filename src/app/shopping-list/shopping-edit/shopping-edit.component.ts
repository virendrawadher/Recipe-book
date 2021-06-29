import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredinets.model';
import { ShoppingListService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('forms') shoppingForm!: NgForm;
  subscribeEditIngredient!: Subscription;
  editIndexIngredirent!: number;
  editMode = false;
  editIngredient!: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscribeEditIngredient =
      this.shoppingListService.editSelectedIngrident.subscribe(
        (index: number) => {
          this.editIndexIngredirent = index;
          this.editMode = true;
          this.editIngredient =
            this.shoppingListService.getIngredientByIndex(index);
          this.shoppingForm.setValue({
            name: this.editIngredient.name,
            amount: this.editIngredient.amount,
          });
        }
      );
  }

  addIngridient(forms: NgForm) {
    const value = forms.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editIndexIngredirent,
        newIngredient
      );
    } else {
      this.shoppingListService.addToIngredientList(newIngredient);
    }
    this.editMode = false;
    forms.reset();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteSelectedIngredient(
      this.editIndexIngredirent
    );
    this.onClear();
  }

  ngOnDestroy() {
    this.subscribeEditIngredient.unsubscribe();
  }
}
