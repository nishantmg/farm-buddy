import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ProductionComponent } from './production/production.component';
import { Product } from '../models/product';
import { ProductionAddComponent } from './production-add/production-add.component';

const productionRoutes : Routes = [{
    path:'production',
    component : ProductionComponent
},
{
    path:'production/add',
    component: ProductionAddComponent
}
];
@NgModule({
    imports: [
        RouterModule.forChild(productionRoutes)
    ],
    exports: [RouterModule]
})

export class ProductionRoutingModule{};