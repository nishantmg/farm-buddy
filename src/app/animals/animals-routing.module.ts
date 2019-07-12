import { ProductAddComponent } from './product-add/product-add.component';
import { FoodAddComponent } from './food-add/food-add.component';
import { AnimaltypeAddComponent } from './animaltype-add/animaltype-add.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './animal/animal.component';
import { AnimalTypeComponent } from './animal-type/animal-type.component';
import { FoodComponent } from './food/food.component';
import { FoodPricingComponent } from './food-pricing/food-pricing.component';
import { ProductComponent } from './product/product.component';
import { ProductPricingComponent } from './product-pricing/product-pricing.component';
import { IonicModule } from '@ionic/angular';
import { AnimalAddComponent } from './animal-add/animal-add.component';
import { MyfarmComponent } from './myfarm/myfarm.component';
import { ProgressComponent } from './progress/progress.component';

const animalRoutes: Routes = [
    {
        path: 'animal',
        component: AnimalComponent
    },
    {
        path: 'animal-add',
        component: AnimalAddComponent
    },
    {
        path: 'animal-type',
        component: AnimalTypeComponent
    },
    {
        path: 'animal-type-add',
        component: AnimaltypeAddComponent
    },
    {
        path: 'food',
        component: FoodComponent
    },
    {
        path: 'food/add',
        component: FoodAddComponent
    },
    {
        path: 'food-pricing',
        component: FoodPricingComponent
    },
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'product/add',
        component: ProductAddComponent
    },
    {
        path: 'product-pricing',
        component: ProductPricingComponent
    },
    {
        path: 'myfarm',
        component: MyfarmComponent
    },
    {
        path: 'progress',
        component: ProgressComponent
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(animalRoutes)
    ],
    exports: [RouterModule]
})

export class AnimalsRoutingModule { };