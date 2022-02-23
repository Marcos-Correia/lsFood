import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping/shopping.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    private _recipeSelected = new EventEmitter<Recipe>();

    constructor(private shoppingListService: ShoppingListService) { }

    private recipes: Recipe[] = [
        // new Recipe("Cake","Delicius chocolate cake","https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_2.jpg?resize=650,910")
        new Recipe(
            "Cake",
            "Delicius chocolate cake",
            "https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_2.jpg?resize=650,910",
            [new Ingredient("baking powder", 1)]),
        new Recipe(
            "Bolo de Chocolate",
            "Delicius chocolate cake",
            "https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_2.jpg?resize=650,910",
            [
                new Ingredient("fermento", 1),
                new Ingredient("chocolate em pó",1)
            ])
    ]
    getRecipes() {
        //                  copying
        return this.recipes.slice()
    }
    getRecipe(index:number){
        return this.recipes[index]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients)
    }
    public get recipeSelected() {
        return this._recipeSelected;
    }
}