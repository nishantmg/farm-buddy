import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent implements OnInit {
  foods: Food[] = [];

  constructor(
    private db: DatabaseService
  ) {

  }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getFoods().subscribe(foods => {
          this.foods = foods;
          console.log(this.foods);
        })
      }
    })
  }
}