import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "./recipe-book/detail/detail.component";
import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-book/recipe-start/recipe-start.component";
import { ShoppingComponent } from "./shopping/shopping.component";
const appRoutes:Routes=[
    //order matters
    {path:'',redirectTo:'/recipes', pathMatch:'full'},
    {path:'recipes', component:RecipeBookComponent, children:[
        {path:'', component:RecipeStartComponent},
        {path:'new', component:RecipeEditComponent},
        {path:':id', component:DetailComponent},
        {path:':id/edit', component:RecipeEditComponent},
    ]},
    {path:'shopping-list', component:ShoppingComponent}
]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{
}