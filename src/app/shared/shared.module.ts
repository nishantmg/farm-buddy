import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { IonicModule } from '@ionic/angular';
import {
  RoundProgressModule,
  ROUND_PROGRESS_DEFAULTS
} from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RoundProgressModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    RoundProgressModule
  ],
  providers: [
    {
      provide: ROUND_PROGRESS_DEFAULTS,
      useValue: {
        color: '#f00',
        background: '#0f0'
      }
    }
  ]
})
export class SharedModule { }
