
import { Subject } from "rxjs"
import { Ingredient } from "../shared/ingredient.model"
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>()
    startingEditing = new Subject<number>()
    private _ingredients: Ingredient[] = [
        new Ingredient("Apples", 5), new Ingredient("Tomato", 10)
    ]

    getIngredient(index: number) {
        return this._ingredients[index]
    }
    onIngridientAdded(ingredient: Ingredient) {
        this._ingredients.push(ingredient)
        this.ingredientsChanged.next(this.ingredients.slice())
    }
    addIngredients(ingredients: Ingredient[]) {
        this._ingredients.push(...ingredients)
        // this._ingredients.splice(this._ingredients.length,0,...ingredients)
        this.ingredientsChanged.next(this.ingredients.slice())
    }
    public get ingredients(): Ingredient[] {
        return this._ingredients.slice()
    }
    updateIngredient(index: number, newIngridient: Ingredient) {
        this._ingredients[index] = newIngridient
        this.ingredientsChanged.next(this.ingredients.slice())
    }
    deleteIngredient(index:number) {
        this._ingredients.splice(index,1)
        this.ingredientsChanged.next(this.ingredients.slice())
    }
}