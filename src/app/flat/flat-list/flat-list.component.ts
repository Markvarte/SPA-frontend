import { Component, OnInit } from '@angular/core';
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

  public static currentHouseId: number;
  // static for flat-add-update.component
  public flats: Array<Flat>;
  // Array of Flats, which will be displayed
  public defaultFlat: Flat;
  // for initializing default values (all null)
  constructor(
    private flatService: FlatService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // initializing default values
    this.defaultFlat = new DefaultFlat();
  }

  deleteFlat(flatId: number) {
    // find index which needed to be deleted
    const deleteIndex = this.flats.findIndex(flat => flat.id === flatId);
    // delete flat from server and on subscribe return it back
    this.flatService.remove(flatId)
      .subscribe( // delete flat from array
        () => this.flats.splice(deleteIndex, 1),
        (err: HttpErrorResponse) => { // if errors
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
