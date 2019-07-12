import { Animal } from './../../models/animal';
import { Component, OnInit } from '@angular/core';
import { Consumption } from 'src/app/models/consumption';
import { DatabaseService } from 'src/app/services/database.service';
import { NavController } from '@ionic/angular';
import { AnimalType } from 'src/app/models/animal-type';
import { Food } from 'src/app/models/food';

@Component({
  selector: 'app-consumption-add',
  templateUrl: './consumption-add.component.html',
  styleUrls: ['./consumption-add.component.scss'],
})
export class ConsumptionAddComponent implements OnInit {
  consumption : Consumption = new Consumption();
  animalTypes: AnimalType[];
  animals: Animal[];
  foods : Food[];
  errorMsg : string;
  constructor(
    private db: DatabaseService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if(rdy) {
        this.db.getAnimals().subscribe(animals => {
          this.animals = animals;
        })

        this.db.getFoods().subscribe(foods => {
          this.foods = foods;
        })
      }
    })
  }

  onSave() {
    console.log(this.consumption);
    if(this.consumption.animal_code && this.consumption.food_code && this.consumption.consumed_unit && this.consumption.consumption_amount) {
      this.db.addConsumption(this.consumption).then(res => {
        if(res) {
          this.navController.navigateRoot('/consumption/consumption');
        }
      })
    } else {
      this.errorMsg = "Please enter valid information.";
    }
  }

}
