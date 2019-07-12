import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProductAddComponent } from './product-add/product-add.component';
import { FoodAddComponent } from './food-add/food-add.component';
import { AnimaltypeAddComponent } from './animaltype-add/animaltype-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalTypeComponent } from './animal-type/animal-type.component';
import { FoodComponent } from './food/food.component';
import { FoodPricingComponent } from './food-pricing/food-pricing.component';
import { ProductComponent } from './product/product.component';
import { ProductPricingComponent } from './product-pricing/product-pricing.component';
import { AnimalComponent } from './animal/animal.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { AnimalAddComponent } from './animal-add/animal-add.component';
import { MyfarmComponent } from './myfarm/myfarm.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { ProgressComponent } from './progress/progress.component';


@NgModule({
  declarations: [
    AnimalComponent,
    AnimalAddComponent,
    AnimalTypeComponent,
    AnimaltypeAddComponent,
    FoodComponent,
    FoodAddComponent,
    FoodPricingComponent,
    ProductComponent,
    ProductAddComponent,
    ProductPricingComponent,
    MyfarmComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    AnimalsRoutingModule,
    Ng2GoogleChartsModule,
    //IonicPageModule.forChild(HomePage)
  ]
})
export class AnimalsModule { }
