import { Component, OnInit, Input } from '@angular/core';
import { Tenant, DefaultTenant } from '../tenant-interface/default-tenant';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../tenant.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FlatListComponent } from '@app/flat/flat-list/flat-list.component';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.css']
})
export class TenantListComponent implements OnInit {

  // Array of tenants, which will be displayed
  tenants: Array<Tenant>;
  // for initializing default values (null and empty strings)
  defaultTenant: Tenant;
/*   // needed for navigation
  @Input() currentHouseId: number; */
  constructor(
    private tenantService: TenantService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // initializing default values
    this.defaultTenant = new DefaultTenant();
  }
  backToFlats() { // PROBLEM there to find houseID
   // this.router.navigate(['/flats/', 88]);
  }
  deleteTenant(tenantId: number) {
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
          // if errors -> navigate to root
          this.router.navigate(['/']);
        }
      );
  }
}
