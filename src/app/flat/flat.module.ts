import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatListComponent } from './flat-list/flat-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlatRoutingModule } from './flat-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlatRoutingModule
  ],
  declarations: [
    FlatListComponent
  ]
})
export class FlatModule { }
