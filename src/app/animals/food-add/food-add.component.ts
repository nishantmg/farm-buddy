import { FoodPricing } from './../../models/food-pricing';
import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { DatabaseService } from 'src/app/services/database.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.scss'],
})
export class FoodAddComponent implements OnInit {

  food: Food = new Food();
  foodPricing: FoodPricing = new FoodPricing();
  errorMsg: string;


  constructor(
    private db: DatabaseService,
    private navController: NavController
  ) { }

  ngOnInit() {
    
  }
  onSave() {
    console.log(this.food);
    if (this.food.food_name && this.food.measurement_unit) {
      this.db.addFood(this.food).then(res => {
        if (res) {
          // this.foodPricing.food_code = this.food.code;
          // this.db.addFoodPrice(this.foodPricing).then(res => {
            this.navController.navigateRoot('/animals/food');

          }
        })
      //})
    } else {
      this.errorMsg = "Please enter valid information."
    }
  }
}
