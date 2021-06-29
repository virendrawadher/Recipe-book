import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropDownDirective } from './dropDown.directive';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { PlaceHolderDirective } from './placeholder/placholder.directive';

@NgModule({
  declarations: [
    AlertComponent,
    LoaderSpinnerComponent,
    PlaceHolderDirective,
    DropDownDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoaderSpinnerComponent,
    PlaceHolderDirective,
    DropDownDirective,
    CommonModule,
  ],
})
export class SharedModule {}
