import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping/shopping.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-book-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  selectedRecipe:Recipe
  id:number
  constructor(private recipeService: RecipeService, 
    private route:ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = +params['id']
        this.selectedRecipe = this.recipeService.getRecipe(this.id)
      }
    )
  }
  addIngredientsToShoppingList(){ 
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients)
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['../'],{relativeTo:this.route})

  }
}
