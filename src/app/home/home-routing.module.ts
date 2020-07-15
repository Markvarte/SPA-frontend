import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { HouseListComponent } from '@app/house/house-list/house-list.component';

/* const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/houses', pathMatch: 'full' },
    { path: 'houses', component: HouseListComponent, data: { title: extract('Houses') } }
  ])
]; */

@NgModule({
/*   imports: [RouterModule.forChild(routes)],
  exports: [RouterModule], */
  providers: []
})
export class HomeRoutingModule { }
