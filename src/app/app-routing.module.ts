import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'animals',
    loadChildren: './animals/animals.module#AnimalsModule'
  },
  { path: 'consumption',
    loadChildren: './consumption/consumption.module#ConsumptionModule'
  },
  { path: 'production',
    loadChildren: './production/production.module#ProductionModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
