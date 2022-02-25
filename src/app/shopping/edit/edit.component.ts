import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm:NgForm

  subscription :Subscription
  editMode = false
  editedItemIndex:number
  editedItem:Ingredient

  constructor(private shoppingListService:ShoppingListService ) { }
  
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startingEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex = index
        this.editMode = true
        this.editedItem = this.shoppingListService.getIngredient(index)
        this.shoppingListForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    )
  }
  onSubmit(form:NgForm){
    const value = form.value
    const newIngridient = new Ingredient(value.name,value.amount)
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngridient)
    }else{
      this.shoppingListService.onIngridientAdded(newIngridient)
    }
    this.onClear()
  }

  onClear(){
    this.editMode=false
    this.shoppingListForm.reset()
  }
  onDelete(){
    this.onClear()
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
