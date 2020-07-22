import { Component, OnInit, Input } from '@angular/core';
import { House, DefaultHouse } from '../house-interface/default-house';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseServiceService } from '../house-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-house-add-update',
  templateUrl: './house-add-update.component.html',
  styleUrls: ['./house-add-update.component.css']
})
export class HouseAddUpdateComponent implements OnInit {

  house: House; // current house data
  isValid = false;
  houseForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // define default house value
    this.house = new DefaultHouse();
    this.createForm();
  }
  onFormSubmit() {
    if (this.houseForm.valid) {
      // if valid => house data contains submitted form data
      this.house = this.houseForm.value;
      // if form contains id
      if (!this.houseForm.value.id) {
        this.addHouse(this.house);
      } else { // if form not contains id
        this.updateHouse(this.house);
      }
      this.isValid = true; // for message "Form submitted successfully."
      this.houseForm.reset();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      //  '+' === 'parseToInt(...)'
      this.house.id = +param.houseId;
      if (this.house.id) { // if number param exist
        // edit mode
        // house contains house from server
        this.getHouseFromServer(this.house.id);
      } // else add mode (form is empty)
    });
  }

  private getHouseFromServer(id: number) {
    // get house from server by its id
    this.houseService.getById(id)
      // if success initialize house
      .subscribe(houseFromServer => {
        this.house = houseFromServer; // after this not in function value of house still default
        // fill form with data from server
        this.fillForm(this.house);
      },
        // if errors console.log it
        (err: HttpErrorResponse) => console.log(err.error));
  }
  private fillForm(house: House) {
    // method fill in form with house data for editing
    this.houseForm.patchValue(house);
    // patch because of server return field "flat" which not defined in form
  }
  private createForm() {
    this.houseForm = this.formBuilder.group({
      id: [null], // hidden
      num: [null, [Validators.required, Validators.min(1)]], // natural number: >= 1
      street: ['', [Validators.required, Validators.minLength(3)]],
      sity: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      postCode: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  private updateHouse(house: House) {
    // method updates house on server
    this.houseService.update(house)
      // if success house on front updates too
      // (this is not really necessary, but what i need to do with returned updated house?)
      .subscribe(newHouse => {
        this.house = newHouse;
        this.router.navigate(['/']);
      },
        // if errors console.log it
        (err: HttpErrorResponse) => console.log(err.error));
  }
  private addHouse(house: House) {
    // method adds house on server
    this.houseService.add(house)
      // if success house on front updates too
      // (this is not really necessary, but what i need to do with returned new house?)
      .subscribe(newHouse => { this.house = newHouse; },
        // if errors console.log it
        (err: HttpErrorResponse) => console.log(err.error));
  }
}
