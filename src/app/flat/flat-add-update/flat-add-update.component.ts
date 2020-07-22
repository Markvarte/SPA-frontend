import { Component, OnInit } from '@angular/core';
import { Flat, DefaultFlat } from '../flat-interface/default-flat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlatService } from '../flat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlatListComponent } from '../flat-list/flat-list.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-flat-add-update',
  templateUrl: './flat-add-update.component.html',
  styleUrls: ['./flat-add-update.component.css']
})
export class FlatAddUpdateComponent implements OnInit {

  flat: Flat;
  flatForm: FormGroup;
  isValid = false;
  // for displaying "submitted successfully" alert

  constructor(
    private formBuilder: FormBuilder,
    private flatService: FlatService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.flat = new DefaultFlat();
    this.createForm();
  }
  onFormSubmit() {
    if (this.flatForm.valid) {
      // if valid => flat data contains submitted form data
      this.flat = this.flatForm.value;
      // after form value assigned to this.flat, this.flat.id and houseId become null
      this.flat.houseId = FlatListComponent.currentHouseId;
      // if form not contains id
      if (!this.flatForm.value.id) {
        this.addFlat(this.flat);
      } else { // if form contains id
        this.updateFlat(this.flat);
      }
      this.isValid = true; // for message "Form submitted successfully."
      this.flatForm.reset(); // clean form
    }
  }
  backToFlats() {
    // segments 'edit/id' and 'add' can't be navigated just by '../',
    // because edit goes to /edit route and add goes to list route.
    // that why there is absolute route t0 navigate back
    this.router.navigateByUrl(`/flats/${FlatListComponent.currentHouseId}`);
  }
  ngOnInit() {
    this.route.params.subscribe(param => {
      //  '+' === 'parseToInt(...)'
      this.flat.id = +param.flatId;

      // TODO: ну кароче статик не нужен 💩💩💩
      this.flat.houseId = FlatListComponent.currentHouseId;

      if (this.flat.id) {// if number param exist
        // edit mode
        // flat contains flat from server gotten by id
        // fill in form with flat from server info
        this.getFlatFromServer(this.flat.id);
      } // else add mode (form is empty)
    });
  }

  private getFlatFromServer(id: number) {
    // get flat from server by its id
    this.flatService.getById(id)
      // if success initialize flat
      .subscribe(flatFromServer => {
        this.flat = flatFromServer; // after this not in function value of flat still default

        // fill form with data from server
        this.fillForm(this.flat);
      },
        // if errors console.log it
        (err: HttpErrorResponse) => console.log(err.error));
  }
  private fillForm(flat: Flat) {
    // method fill in form with flat data for editing
    this.flatForm.patchValue(flat);
    // patch because of server return fields which are not defined in form on frontend
  }
  private createForm() {
    this.flatForm = this.formBuilder.group({
      id: [null], // hidden
      num: [null, [Validators.required, Validators.min(1)]],
      floor: [null, [Validators.required, Validators.min(1)]],
      roomsCount: [null, [Validators.required, Validators.min(1)]],
      tenantsCount: [null, [Validators.required, Validators.min(0)]], // calculate this by connected tenant id ?
      totalArea: [null, [Validators.required, Validators.min(15)]],
      livingArea: [null, [Validators.required, Validators.min(15)]],
      houseId: [null] // hidden
    });
  }
  private updateFlat(flat: Flat) {
    // method updates flat on server
    this.flatService.update(flat)
      // if success flat on front updates too
      // (this is not really necessary, but what i need to do with returned updated flat?)
      .subscribe(newFlat => {
        this.flat = newFlat;
        this.router.navigateByUrl(`/flats/${FlatListComponent.currentHouseId}`);
      },
        // if errors console.log it
        (err: HttpErrorResponse) => console.log(err.error));
  }
  private addFlat(flat: Flat) {
    // method adds flat on server
    this.flatService.add(flat)
      // if success flat on front updates too
      // (this is not really necessary, but what i need to do with returned new flat?)
      .subscribe(newFlat => { this.flat = newFlat; },
        // if errors console.log it
        (err: HttpErrorResponse) => console.log(err.error));
  }
}
