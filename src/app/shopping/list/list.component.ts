import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[]
  private ingredientChanged:Subscription
  constructor(private ingredientsService:ShoppingListService) { }
  ngOnInit(): void {
    this.ingredients = this.ingredientsService.ingredients
    this.ingredientChanged = this.ingredientsService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients
      }
    )
  }
  ngOnDestroy(): void {
    this.ingredientChanged.unsubscribe()
  }
}
