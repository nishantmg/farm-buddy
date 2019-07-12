import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { DatabaseService } from 'src/app/services/database.service';
import { Consumption } from 'src/app/models/consumption';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss'],
})
export class ConsumptionComponent implements OnInit {
  consumptions : Consumption[] = [];
  foods : Food[]=[];
  constructor(
    private db : DatabaseService
  ) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getFoods().subscribe(foods => {
          this.foods = foods;
        })
        this.db.getConsumptions().subscribe(consumption => {
          this.consumptions = consumption;
        })
      }
    })
  }
  getFoodName(consumption) {
    let food = this.foods.find(food => food.code === consumption.food_code) || null;
    consumption.foodName = food;
    return food ? food.food_name : '';
  }

}
