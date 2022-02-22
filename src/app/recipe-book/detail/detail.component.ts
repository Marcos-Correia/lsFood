import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping/shopping.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-book-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() selectedRecipe:Recipe
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  addIngredientsToShoppingList(){ 
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients)
    // this.shoppingListService.addMultipleIngredients(this.selectedRecipe.ingredients)
  }

}
