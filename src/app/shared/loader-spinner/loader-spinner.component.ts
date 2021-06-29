import { Component } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  template:
    '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loader-spinner.component.css'],
})
export class LoaderSpinnerComponent {}
