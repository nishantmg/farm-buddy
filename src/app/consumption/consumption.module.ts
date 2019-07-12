import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumptionRoutingModule } from './consumption-routing.module';
import { ConsumptionAddComponent } from './consumption-add/consumption-add.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ConsumptionAddComponent,ConsumptionComponent],
  imports: [
    CommonModule,
    ConsumptionRoutingModule,
    SharedModule,
    IonicModule
  ]
})
export class ConsumptionModule { }
