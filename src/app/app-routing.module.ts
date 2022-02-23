import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "./recipe-book/detail/detail.component";
import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { RecipeStartComponent } from "./recipe-book/recipe-start/recipe-start.component";
import { ShoppingComponent } from "./shopping/shopping.component";

const appRoutes:Routes=[
    {path:'',redirectTo:'/recipes', pathMatch:'full'},
    {path:'recipes', component:RecipeBookComponent, children:[
        {path:'', component:RecipeStartComponent},
        {path:':id', component:DetailComponent}
    ]},
    {path:'shopping-list', component:ShoppingComponent}
]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}