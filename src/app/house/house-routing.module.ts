import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { HouseListComponent } from './house-list/house-list.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/houses', pathMatch: 'full', data: { title: extract('Houses') } },
    // path: '' by default display house list
    { path: 'houses', component: HouseListComponent, data: { title: extract('Houses') } } // route to house list
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HouseRoutingModule { }
