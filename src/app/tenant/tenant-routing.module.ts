import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/i18n';
import { TenantComponent } from './tenant/tenant.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantAddUpdateComponent } from './tenant-add-update/tenant-add-update.component';
const routes: Routes = [
  {
    path: ':houseId/:flatId', component: TenantComponent,
    children: [
      {
        path: '', redirectTo: 'list', pathMatch: 'full',
      },
      {
        path: 'list', component: TenantListComponent, data: { title: extract('Tenants') },
      },
      {
        path: 'add', component: TenantAddUpdateComponent, data: { title: extract('Tenant adding') },
      },
      {
        path: 'edit/:tenantId', component: TenantAddUpdateComponent, data: { title: extract('Tenant editing') },
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


export class TenantRoutingModule { }
