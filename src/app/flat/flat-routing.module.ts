import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatListComponent } from './flat-list/flat-list.component';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/i18n';

const routes: Routes = [
  {
    path: '', redirectTo: '/', pathMatch: 'full',
  },
  {
    path: ':houseId', component: FlatListComponent, data: { title: extract('Flats') },
    // children: [
    //   {
    //     path: 'add'
    //   }
    // ]
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class FlatRoutingModule { }
