import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-book-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // @Input() selectedRecipeIndex;
  @Output() recipeWasSelected = new EventEmitter<Recipe>()
  @Output() recipes:Recipe[] = [
    new Recipe("Cake","Delicius chocolate cake","https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_2.jpg?resize=650,910"),
    new Recipe("Bolo de Chocolate","Delicius chocolate cake","https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_2.jpg?resize=650,910"),
    // new Recipe("Cake","Delicius chocolate cake","https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_2.jpg?resize=650,910")

  ]

  constructor() { }

  ngOnInit(): void {
  }
  setSelectedRecipeIndex(recipe:Recipe){
    // console.log(i)
    this.recipeWasSelected.emit(recipe)
  }
}
