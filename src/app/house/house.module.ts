import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HouseListComponent } from './house-list/house-list.component';
import { HouseRoutingModule } from './house-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HouseAddUpdateComponent } from './house-add-update/house-add-update.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    HouseRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HouseListComponent,
    HouseAddUpdateComponent
  ]
})
export class HouseModule { }
