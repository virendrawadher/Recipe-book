import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  PreloadingStrategy,
  RouterModule,
  Routes,
} from '@angular/router';

const appRoute: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    // loadChildren: './recepies/recipes.module#RecipesModule',
    loadChildren: () =>
      import('./recepies/recipes.module').then((m) => m.RecipesModule),
    data: { preload: true },
  },
  {
    path: 'shoppinglist',
    // loadChildren: './shopping-list/shopping.module#ShoppingListModule',
    loadChildren: () =>
      import('./shopping-list/shopping.module').then((m) => m.ShoppingModule),
    data: { preload: true },
  },
  {
    path: 'auth',
    // loadChildren: './auth/auth.module#AuthModule',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    data: { preload: true },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoute, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRouting {}
