import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredinets.model';
import { ShoppingListService } from 'src/app/shopping-list/shoppinglist.service';
import { Recepies } from '../recepies.model';
import { RecipesService } from '../recepies.service';

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
    private router: Router // private shoppingListService: ShoppingListService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeDetail = this.recipeService.getRecipeByIndex(this.id);
    });
  }

  addToShoppingList() {
    this.recipeService.addIngredientToShoppingList(
      this.recipeDetail.ingredients
    );
    // this.shoppingListService.addToShoppingList(this.recipeDetail.ingredient);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onRecipeEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
