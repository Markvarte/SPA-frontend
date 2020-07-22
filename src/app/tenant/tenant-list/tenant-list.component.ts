import { Component, OnInit, Input } from '@angular/core';
import { Tenant, DefaultTenant } from '../tenant-interface/default-tenant';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../tenant.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.css']
})
export class TenantListComponent implements OnInit {

  // Array of tenants, which will be displayed
  tenants: Array<Tenant>;
  // For initializing default values (null and empty strings)
  defaultTenant: Tenant;
  constructor(
    private tenantService: TenantService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // Initializing default values
    this.defaultTenant = new DefaultTenant();
  }
  backToFlats() {
    // HouseId is the same for all tenants in the list, so
    // There is no difference take it from [0] elements or [1] ...
    console.log("house id is = " + this.tenants[0].houseId);
    this.router.navigate(['/flats/', this.tenants[0].houseId]);
  }
  deleteTenant(tenantId: number) {
    // Find index which needed to be deleted
    const deleteIndex = this.tenants.findIndex(tenant => tenant.id === tenantId);
    // Delete tenant from server and on subscribe return it back
    this.tenantService.remove(tenantId)
      .subscribe( // Delete tenant from array
        () => this.tenants.splice(deleteIndex, 1),
        (err: HttpErrorResponse) => { // If errors
          // TODO: Error message
          console.log(err.error);
        }
      );
  }
  ngOnInit() {
    this.route.parent.params.subscribe(param => {
      if (param.flatId) {
        this.getTenantsFromServer(param.flatId);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  getTenantsFromServer(flatId: number): void {
    this.tenantService.getByFlatId(flatId)
      .subscribe(
        (data: Array<Tenant>) => {
          this.tenants = data;
        },
        (err: HttpErrorResponse) => {
          // If errors -> navigate to root
          this.router.navigate(['/']);
        }
      );
  }
}
