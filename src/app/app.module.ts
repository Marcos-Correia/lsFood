import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ListComponent } from './shopping/list/list.component';
import { EditComponent } from './shopping/edit/edit.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { ItemComponent } from './recipe-book/item/item.component';
import { DetailComponent } from './recipe-book/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingComponent,
    ListComponent,
    EditComponent,
    RecipeBookComponent,
    ItemComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
