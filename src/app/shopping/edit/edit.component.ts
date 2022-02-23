import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('nameInput',{static:true}) nameInputReference:ElementRef
  @ViewChild('amountInput',{static:true}) amountInoutReference:ElementRef
  constructor(private shoppingListService:ShoppingListService ) { }
  
  ngOnInit(): void {
  }
  onAddItem(){
    const ingridientName = this.nameInputReference.nativeElement.value
    const ingridientAmount = this.amountInoutReference.nativeElement.value
    const newIngridient = new Ingredient(ingridientName,ingridientAmount)
    this.shoppingListService.onIngridientAdded(newIngridient)
  }
}
