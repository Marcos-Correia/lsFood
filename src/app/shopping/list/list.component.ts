import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ingredients:Ingredient[] = [
    new Ingredient("Apples",5),new Ingredient("Tomato",10)
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onIngridientAdded(ingredient:Ingredient){
    this.ingredients.push(ingredient)
  }
}
