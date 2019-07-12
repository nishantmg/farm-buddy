import { Animal } from './../../models/animal';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Production } from 'src/app/models/production';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
})
export class ProductionComponent implements OnInit {
  productions : Production [] = [];
  products : Product [] =[];
  animals: Animal[] = [];
  constructor(
    private db : DatabaseService
  ) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getProductions().subscribe(production => {
          this.productions = production;
          console.log(this.productions);
        })

        this.db.getProducts().subscribe(products => {
          this.products = products;
        })

        this.db.getAnimals().subscribe(animals => {
          this.animals = animals;
        })
      }
    })
  }

  getProductName(production) {
    let product = this.products.find(product => product.code === production.product_code) || null;
    production.productName = product;
    return product ? product.product_name : '';
  }

  getAnimalName(production) {
    let animal = this.animals.find(animal => animal.code === production.animal_code);
    return animal ? animal.animal_name : '';
  }

}
