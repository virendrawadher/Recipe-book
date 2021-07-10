import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/datastorage.service';
import { map } from 'rxjs/operators';
import * as fromApp from '../appStore/appReducer';
import * as AuthAction from '../auth/authStore/auth.actions';
import * as RecipeActions from '../recepies/recipe-store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapse = true;
  isAuthenticated = false;
  private userSub!: Subscription;

  @Output() featureSelected = new EventEmitter<string>();

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
        console.log(user);
        console.log(!user);
        console.log(!!user);
      });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveData() {
    // this.dataStorageService.saveData();
    this.store.dispatch(new RecipeActions.StoreRecipe());
  }

  onFetchData() {
    // this.dataStorageService.fetchData().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipe());
  }

  onLogout() {
    this.store.dispatch(new AuthAction.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
