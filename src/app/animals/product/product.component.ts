import { Animal } from './../../models/animal';
import { DatabaseService } from './../../services/database.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  animals: Animal[] = [];

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if(rdy) {
        this.db.getAnimals().subscribe(animals => {
          this.animals = animals;
          console.log(this.animals);
        })
        this.db.getProducts().subscribe(products => {
          this.products = products;
          console.log(this.products);
        })
      }
    })
  }

  getAnimalName(product) {
    let animal = this.animals.find(animal => animal.code === product.animal_code);
    return animal ? animal.animal_name : '';
  }

}
