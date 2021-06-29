import { NgModule } from '@angular/core';
import { PreloadingStrategy, RouterModule, Routes } from '@angular/router';

const appRoute: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recepies/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'shoppinglist',
    loadChildren: () =>
      import('./shopping-list/shopping.module').then((m) => m.ShoppingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoute, { preloadingStrategy: PreloadingStrategy }),
  ],
  exports: [RouterModule],
})
export class AppRouting {}
