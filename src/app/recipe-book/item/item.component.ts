import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-book-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() recipe:Recipe
  @Output() recipeSelected = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
  }
  onSelected(){
    this.recipeSelected.emit()
  }
}
