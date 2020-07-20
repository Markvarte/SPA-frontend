import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatListComponent } from './flat-list/flat-list.component';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/i18n';
import { FlatAddUpdateComponent } from './flat-add-update/flat-add-update.component';
import { FlatComponent } from './flat/flat.component';

const routes: Routes = [
  {
    path: ':houseId', component: FlatComponent,
    children: [
      {
        path: '', redirectTo: 'list', pathMatch: 'full',
      },
      {
        path: 'list', component: FlatListComponent, data: { title: extract('Flats') },
      },
      {
        path: 'add', component: FlatAddUpdateComponent, data: { title: extract('Flat adding') },
      },
      {
        path: 'edit/:flatId', component: FlatAddUpdateComponent, data: { title: extract('Flat adding') },
      },
    ]
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class FlatRoutingModule { }
