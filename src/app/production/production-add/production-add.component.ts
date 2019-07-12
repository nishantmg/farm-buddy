import { Animal } from './../../models/animal';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { NavController } from '@ionic/angular';
import { Production } from 'src/app/models/production';
import { Product } from 'src/app/models/product';
import { AnimalType } from 'src/app/models/animal-type';

@Component({
  selector: 'app-production-add',
  templateUrl: './production-add.component.html',
  styleUrls: ['./production-add.component.scss'],
})
export class ProductionAddComponent implements OnInit {
  production : Production = new Production();
  animalTypes: AnimalType[];
  animals: Animal[];
  products : Product[];
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

        this.db.getProducts().subscribe(products => {
          this.products = products;
        })
      }
    })
  }

  onSave() {
    console.log(this.production);
    if(this.production.animal_code && this.production.product_code && this.production.production_unit && this.production.production_amount) {
      this.db.addProduction(this.production).then(res => {
        if(res) {
          this.navController.navigateRoot('/production/production');
        }
      })
    } else {
      this.errorMsg = "Please enter valid information.";
    }
  }

}
