import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { HouseListComponent } from './house-list/house-list.component';
import { Shell } from '@app/shell/shell.service';
import { HouseAddUpdateComponent } from './house-add-update/house-add-update.component';

const routes: Routes = [
  Shell.childRoutes([
    {// route to house list
      path: '', component: HouseListComponent, data: { title: extract('Houses') },
    },
    {// route for house adding
      path: 'add', component: HouseAddUpdateComponent, data: { title: extract('Add') }
    },
    {// for house update
      path: 'edit/:houseId', component: HouseAddUpdateComponent, data: { title: extract('Update') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HouseRoutingModule { }
