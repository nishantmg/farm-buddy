import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production/production.component';
import { ProductionAddComponent } from './production-add/production-add.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ProductionComponent,ProductionAddComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    SharedModule,
    IonicModule
  ]
})
export class ProductionModule { }
