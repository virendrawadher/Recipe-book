import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredinets.model';
import * as ShoppingListActions from '../shopping-list-store/shopping-list.actions';
import * as fromApp from '../../appStore/appReducer';

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
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.subscribeEditIngredient = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editIngredient = stateData.editedIngredient;
          this.shoppingForm.setValue({
            name: this.editIngredient.name,
            amount: this.editIngredient.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  addIngridient(forms: NgForm) {
    const value = forms.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredirent(newIngredient)
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    forms.reset();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscribeEditIngredient.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
