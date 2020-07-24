import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatListComponent } from './flat-list/flat-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlatRoutingModule } from './flat-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatAddUpdateComponent } from './flat-add-update/flat-add-update.component';
import { FlatComponent } from './flat/flat.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlatRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModalModule,
    FormsModule,
  ],
  declarations: [
    FlatListComponent,
    FlatAddUpdateComponent,
    FlatComponent,
  ]
})
export class FlatModule { }
