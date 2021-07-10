import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recepies } from '../recepies.model';
import { RecipesService } from '../recepies.service';
import { map, switchMap } from 'rxjs/operators';

import * as fromApp from '../../appStore/appReducer';
import * as RecipeAction from '../recipe-store/recipe.actions';
import * as ShoppingListAction from '../../shopping-list/shopping-list-store/shopping-list.actions';
@Component({
  selector: 'app-recepies-detail',
  templateUrl: './recepies-detail.component.html',
  styleUrls: ['./recepies-detail.component.css'],
})
export class RecepiesDetailComponent implements OnInit {
  recipeDetail!: Recepies;
  id!: number;
  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router, // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map((recipeState) => {
          return recipeState.recipes.find((recipe, index) => index === this.id);
        })
      )
      .subscribe((recipe) => {
        this.recipeDetail = recipe;
      });
  }

  addToShoppingList() {
    // this.recipeService.addIngredientToShoppingList(
    //   this.recipeDetail.ingredients
    // );
    this.store.dispatch(
      new ShoppingListAction.AddIngredients(this.recipeDetail.ingredients)
    );
    // this.shoppingListService.addToShoppingList(this.recipeDetail.ingredient);
  }

  onDelete() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeAction.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

  onRecipeEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
