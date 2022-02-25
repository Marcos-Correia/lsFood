import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Recipe } from "../recipe-book/recipe.model";
import { RecipeService } from "../recipe-book/recipe.service";

const apiUrl = 'https://lsfood-f75c4-default-rtdb.firebaseio.com/recipes.json'
@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeServices: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeServices.getRecipes()
    this.http.put(
      apiUrl,
      recipes).subscribe(response => {
        console.log(response)
      })
  }
  fetchRecipes() {
    this.http
      .get<Recipe[]>(
        apiUrl,
      ).subscribe(recipes=>{
        this.recipeServices.setRecipes(recipes)
      })
      // .pipe(
      //   map(recipes => {
      //     return recipes.map(recipe => {
      //       return {
      //         ...recipe,
      //         ingredients: recipe.ingredients ? recipe.ingredients : []
      //       };
      //     });
      //   }),
      //   tap(recipes => {
      //     this.recipeServices.setRecipes(recipes);
      //   })
      // )
  }
}