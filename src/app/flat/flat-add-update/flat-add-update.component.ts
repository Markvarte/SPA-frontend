import { Component, OnInit } from '@angular/core';
import { Flat, DefaultFlat } from '../flat-interface/default-flat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlatService } from '../flat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flat-add-update',
  templateUrl: './flat-add-update.component.html',
  styleUrls: ['./flat-add-update.component.css']
})
export class FlatAddUpdateComponent implements OnInit {

  public flat: Flat;
  public flatForm: FormGroup;
  public isValid: false;
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

  ngOnInit() {
   // params / modes etc
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
}
