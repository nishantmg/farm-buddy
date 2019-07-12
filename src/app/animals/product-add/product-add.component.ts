import { Animal } from './../../models/animal';
import { DatabaseService } from './../../services/database.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductPricing } from 'src/app/models/product-pricing';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  animals: Animal[] = [];
  product: Product = new Product();
  productPricing: ProductPricing = new ProductPricing();
  errorMsg: string;
  
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
      }
    })
  }

  onSave() {
    console.log(this.product);
    console.log(this.productPricing);
    if(this.product.animal_code && this.product.product_name && this.product.short_name && this.product.measurement_unit) {
      this.db.addProduct(this.product).then(res => {
        if (res) {
          this.productPricing.product_code = this.product.code;
          this.db.addProductPricing(this.productPricing).then(res => {
            this.navController.navigateRoot('/animals/product');
          })
        }
      })
    } else {
      this.errorMsg = "Please enter valid information.";
    }
  }
}
