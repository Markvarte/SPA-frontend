import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { HouseListComponent } from './house-list/house-list.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: HouseListComponent, data: { title: extract('houses') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HouseRoutingModule { }
