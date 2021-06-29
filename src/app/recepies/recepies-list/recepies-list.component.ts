import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recepies } from '../recepies.model';
import { RecipesService } from '../recepies.service';

@Component({
  selector: 'app-recepies-list',
  templateUrl: './recepies-list.component.html',
  styleUrls: ['./recepies-list.component.css'],
})
export class RecepiesListComponent implements OnInit, OnDestroy {
  recipes!: Recepies[];
  recipeSubscribe!: Subscription;

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipeSubscribe = this.recipeService.recipeChnaged.subscribe(
      (recipe: Recepies[]) => {
        this.recipes = recipe;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.recipeSubscribe.unsubscribe();
  }
}
