import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Flat, DefaultFlat } from '../flat-interface/default-flat';
import { FlatService } from '../flat.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.component.html',
  styleUrls: ['./flat-list.component.css']
})
export class FlatListComponent implements OnInit {

  // Static for flat-add-update.component
  static currentHouseId: number;
  /* // output to TenantList
  @Output() goToTenantList = new EventEmitter<number>(); */
  flats: Array<Flat>;
  // Array of Flats, which will be displayed
  defaultFlat: Flat;
  // For initializing default values (all null)
  constructor(
    private flatService: FlatService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // Initializing default values
    this.defaultFlat = new DefaultFlat();
  }

 /*  public emitCurrentHouseIdToTenantList(currentHouseId: number) {
    // Method sent currentHouseId to TenantList
    // because Tenant list button back needs to be navigated to flat list
    // but flat list route contains currentHouseId.
    this.goToTenantList.emit(currentHouseId);
  } */
  deleteFlat(flatId: number) {
    // Find index which needed to be deleted
    const deleteIndex = this.flats.findIndex(flat => flat.id === flatId);
    // Delete flat from server and on subscribe return it back
    this.flatService.remove(flatId)
      .subscribe( // Delete flat from array
        () => this.flats.splice(deleteIndex, 1),
        (err: HttpErrorResponse) => { // If errors
          // TODO: Error message
          console.log(err.error);
        }
      );
  }
  ngOnInit() {
    this.route.parent.params.subscribe(param => {
      FlatListComponent.currentHouseId = +param.houseId;
      if (FlatListComponent.currentHouseId) {
        this.getFlatsFromServer(FlatListComponent.currentHouseId);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  private getFlatsFromServer(houseId: number) {
    this.flatService.getByHouseId(houseId)
      .subscribe(
        (data: Array<Flat>) => {
          this.flats = data;
        },
        (err: HttpErrorResponse) => {
          // if errors -> navigate to root
          this.router.navigate(['/']);
        }
      );
  }

}
