import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { DetailComponent } from "./recipe-book/detail/detail.component";
import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-book/recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipe-book/recipes-resolver.service";
import { ShoppingComponent } from "./shopping/shopping.component";
const appRoutes:Routes=[
    //order matters
    {path:'',redirectTo:'/recipes', pathMatch:'full'},
    {path:'recipes', component:RecipeBookComponent, canActivate:[AuthGuard], children:[
        {path:'', component:RecipeStartComponent},
        {path:'new', component:RecipeEditComponent},
        {path:':id', component:DetailComponent, resolve:[RecipesResolverService]},
        {path:':id/edit', component:RecipeEditComponent, resolve:[RecipesResolverService]},
    ]},
    {path:'shopping-list', component:ShoppingComponent},
    {path:'auth',component:AuthComponent}
]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{
}