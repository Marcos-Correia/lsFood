import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping/shopping.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()
    private recipes: Recipe[] = [
        // new Recipe("Cake","Delicius chocolate cake","https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_2.jpg?resize=650,910")
        // new Recipe(
        //     "Cake",
        //     "Delicius chocolate cake",
        //     "https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_2.jpg?resize=650,910",
        //     [new Ingredient("baking powder", 1)]),
        // new Recipe(
        //     "Bolo de Chocolate",
        //     "Delicius chocolate cake",
        //     "https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_2.jpg?resize=650,910",
        //     [
        //         new Ingredient("fermento", 1),
        //         new Ingredient("chocolate em pó",1)
        //     ])
    ]

    constructor(private shoppingListService: ShoppingListService) { }


    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes);
    }
    getRecipes() {
        //                  copying
        return this.recipes.slice()
    }
    getRecipe(index: number) {
        return this.recipes[index]
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients)
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe
        this.recipesChanged.next(this.recipes.slice())
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice())
    }
}