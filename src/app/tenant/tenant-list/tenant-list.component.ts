import { Component, OnInit } from '@angular/core';
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
  public tenants: Array<Tenant>;
  // Array of tenants, which will be displayed
  public defaultTenant: Tenant;
  // for initializing default values (null and empty strings)
  public currentHouseId: number;
  // needed for navigation
  constructor(
    private tenantService: TenantService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // initializing default values
    this.defaultTenant = new DefaultTenant();
  }
  public backToFlats() {
    this.router.navigate(['/flats/', this.currentHouseId]);
  }
  public deleteTenant(tenantId: number) {
    // find index which needed to be deleted
    const deleteIndex = this.tenants.findIndex(tenant => tenant.id === tenantId);
    // delete tenant from server and on subscribe return it back
    this.tenantService.remove(tenantId)
      .subscribe( // delete tenant from array
        () => this.tenants.splice(deleteIndex, 1),
        (err: HttpErrorResponse) => { // if errors
          // TODO: Error message
          console.log(err.error);
        }
      );
  }
  ngOnInit() {
    this.route.parent.params.subscribe(param => {
      this.currentHouseId = param.houseId; // needed for navigation back to flats
      if (param.houseId && param.flatId) {
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
          // if errors -> navigate to root
          this.router.navigate(['/']);
        }
      );
  }
}
