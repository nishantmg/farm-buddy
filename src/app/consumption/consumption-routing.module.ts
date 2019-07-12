import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ConsumptionComponent } from './consumption/consumption.component';
import { ConsumptionAddComponent } from './consumption-add/consumption-add.component';

const consumptionRoutes : Routes = [{
    path:'consumption',
    component : ConsumptionComponent
},
{
    path:'consumption/add',
    component: ConsumptionAddComponent
}
];
@NgModule({
    imports: [
        RouterModule.forChild(consumptionRoutes)
    ],
    exports: [RouterModule]
})

export class ConsumptionRoutingModule{};