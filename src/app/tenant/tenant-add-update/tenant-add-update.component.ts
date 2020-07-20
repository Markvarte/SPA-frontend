import { Component, OnInit } from '@angular/core';
import { Tenant, DefaultTenant } from '../tenant-interface/default-tenant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TenantService } from '../tenant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantListComponent } from '../tenant-list/tenant-list.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tenant-add-update',
  templateUrl: './tenant-add-update.component.html',
  styleUrls: ['./tenant-add-update.component.css']
})
export class TenantAddUpdateComponent implements OnInit {

  public tenant: Tenant;
  public tenantForm: FormGroup;
  public isValid = false;
  // for displaying "submitted successfully" alert
  public houseId: number = null;

  public flatIdSaver: number; // needed for saving flat id
  constructor(
    private formBuilder: FormBuilder,
    private tenantService: TenantService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tenant = new DefaultTenant();
    this.createForm();
  }
  public onFormSubmit() {
    if (this.tenantForm.valid) {
      // if valid => flat data contains submitted form data
      this.flatIdSaver = this.tenant.flatId;
      this.tenant = this.tenantForm.value;
      // after form value assigned to this.tenant, this.tenant.id and flatId become null
      this.tenant.flatId = this.flatIdSaver;
      // if form not contains id
      if (!this.tenantForm.value.id) {
        this.addTenant(this.tenant);
      } else { // if form contains id
        this.updateTenant(this.tenant);
      }
      this.isValid = true; // for message "Form submitted successfully."
      this.tenantForm.reset(); // clean form
    }
  }
  public backToTenants() {
    // segments 'edit/id' and 'add' can't be navigated just by '../',
    // because edit goes to /edit route and add goes to list route.
    // that why there is absolute route to navigate back
    this.router.navigateByUrl(`/tenants/${this.houseId}/${this.tenant.flatId}`);
  }
  ngOnInit() {
    this.route.params.subscribe(param => {
      this.tenant.id = +param.tenantId;
      // TODO: need to create static field on tenant list
      // this.tenant.flatId = FlatListComponent.currentHouseId;

      if (this.tenant.id) {// if number param exist
        // edit mode
        // tenant contains tenant from server gotten by id
        // fill in form with tenant from server info
        this.getTenantFromServer(this.tenant.id);
      } // else add mode (form is empty)
    });
    // and need to save houseId and flatId anyway
    this.route.parent.params.subscribe(parentParam => {
      this.tenant.flatId = +parentParam.flatId;
      this.houseId = +parentParam.houseId;
    });
  }

  private getTenantFromServer(id: number) {
    // get Tenant from server by its id
    this.tenantService.getById(id)
      // if success initialize Tenant
      .subscribe(tenantFromServer => {
        this.tenant = tenantFromServer; // after this not in function value of Tenant still default

        // fill form with data from server
        this.fillForm(this.tenant);
      },
        // if errors console.log it
        (err: HttpErrorResponse) => console.log(err.error));
  }
  private fillForm(tenant: Tenant) {
    // method fill in form with tenant data for editing
    this.tenantForm.patchValue(tenant);
    // patch because of server return fields which are not defined in form on frontend
  }
  private createForm() {
    this.tenantForm = this.formBuilder.group({
      id: [null], // hidden
      // only letters, spaces and -
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z- ]+$'), Validators.minLength(3)]],
      // only letters, spaces and -
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z- ]+$'), Validators.minLength(3)]],
      // only digits and -
      personalCode: ['', [Validators.required, Validators.pattern('^[0-9-]+$'), Validators.minLength(4)]],
      dateOfBirst: ['', [Validators.required]], // date format
      // only digits
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6)] ],
      eMail: ['', [Validators.required, Validators.email]], // eMail format
      flatId: [null] // hidden
    });
  }

  private updateTenant(tenant: Tenant) {
    // method updates Tenant on server
    this.tenantService.update(tenant)
      // if success Tenant on front updates too
      // (this is not really necessary, but what i need to do with returned updated Tenant?)
      .subscribe(newTenant => { this.tenant = newTenant; },
        // if errors console.log it
        (err: HttpErrorResponse) => console.log(err.error));
  }
  private addTenant(tenant: Tenant) {
    // method adds Tenant on server
    this.tenantService.add(tenant)
      // if success Tenant on front updates too
      // (this is not really necessary, but what i need to do with returned new Tenant?)
      .subscribe(newTenant => { this.tenant = newTenant; },
        // if errors console.log it
        (err: HttpErrorResponse) => console.log(err.error));
  }
}
