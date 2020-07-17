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

  public flats: Array<Flat>;
  // Array of Flats, which will be displayed
  public defaultFlat: Flat;
  // for initializing default values (all null)
  public currentHouseId: number;
  constructor(
    private flatService: FlatService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // initializing default values
    this.defaultFlat = new DefaultFlat();
  }


  ngOnInit() {
    this.route.parent.params.subscribe(param => {
      this.currentHouseId = +param.houseId;
      if (this.currentHouseId) {
        this.getFlatsFromServer(this.currentHouseId);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  deleteFlat(flatId: number) {
    // find index which needed to be deleted
    const deleteIndex = this.flats.findIndex(flat => flat.id === flatId);
    // delete flat from server and on subscribe return it back
    this.flatService.remove(flatId)
      .subscribe( // delete house from array
        () => this.flats.splice(deleteIndex, 1),
        (err: HttpErrorResponse) => { // if errors
          // TODO: Error message
          console.log(err.error);
        }
      );
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
