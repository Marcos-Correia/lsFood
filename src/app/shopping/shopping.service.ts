import { EventEmitter } from "@angular/core"
import { Ingredient } from "../shared/ingredient.model"
export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>()
    private _ingredients: Ingredient[] = [
        new Ingredient("Apples", 5), new Ingredient("Tomato", 10)
    ]
    onIngridientAdded(ingredient: Ingredient) {
        this._ingredients.push(ingredient) 
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
    addIngredients(ingredients:Ingredient[]){
        this._ingredients.push(...ingredients)
        // this._ingredients.splice(this._ingredients.length,0,...ingredients)
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
    public get ingredients(): Ingredient[] {
        return this._ingredients.slice()
    }
    
}