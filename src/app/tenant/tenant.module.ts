import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TenantRoutingModule } from './tenant-routing.module';
import { TenantComponent } from './tenant/tenant.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantAddUpdateComponent } from './tenant-add-update/tenant-add-update.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    TenantRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    TenantListComponent,
    TenantAddUpdateComponent,
    TenantComponent,
  ]
})
export class TenantModule { }

