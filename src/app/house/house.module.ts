import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HouseListComponent } from './house-list/house-list.component';
import { HouseRoutingModule } from './house-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    HouseRoutingModule,
  ],
  declarations: [
    HouseListComponent,
  ]
})
export class HouseModule { }
