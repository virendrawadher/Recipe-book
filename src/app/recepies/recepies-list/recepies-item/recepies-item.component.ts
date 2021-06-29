import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recepies } from '../../recepies.model';
import { RecipesService } from '../../recepies.service';

@Component({
  selector: 'app-recepies-item',
  templateUrl: './recepies-item.component.html',
  styleUrls: ['./recepies-item.component.css'],
})
export class RecepiesItemComponent implements OnInit {
  @Input()
  recipe!: Recepies;

  @Input() id!: number;

  constructor(private recipeService: RecipesService) {}

  ngOnInit() {}
}
