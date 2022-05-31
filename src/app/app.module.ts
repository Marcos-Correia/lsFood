import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ListComponent as ShoppingListComponent } from './shopping/list/list.component';
import { EditComponent } from './shopping/edit/edit.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { ItemComponent } from './recipe-book/item/item.component';
import { ListComponent as RecipeBookListComponent } from './recipe-book/list/list.component'
import { DetailComponent } from './recipe-book/detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping/shopping.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipe-book/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipe-book/recipe.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingComponent,
    ShoppingListComponent,
    EditComponent,
    RecipeBookComponent,
    ItemComponent,
    DetailComponent,
    RecipeBookListComponent,
    DropDownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService, RecipeService, {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
