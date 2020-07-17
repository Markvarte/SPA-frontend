import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatListComponent } from './flat-list/flat-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlatRoutingModule } from './flat-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlatAddUpdateComponent } from './flat-add-update/flat-add-update.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlatRoutingModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    FlatListComponent,
    FlatAddUpdateComponent
  ]
})
export class FlatModule { }
