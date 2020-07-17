import { Component, OnInit, Input } from '@angular/core';
import { House, DefaultHouse } from '../house-interface/default-house';
import { HouseServiceService } from '../house-service.service';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  public houses: Array<House>;
  // Array of Houses, which will be displayed
  public defaultHouse: House;
  // for initializing default values (null and empty strings)
  constructor(
    private houseService: HouseServiceService,
    // for sending requests to server
  ) { // initializing default values (null and empty strings)
    this.defaultHouse = new DefaultHouse();
  }

  public deleteHouse(houseId: number) {
    // я забыла как без lodash и не могу придумать
    const deleteIndex = _.findIndex(this.houses, { id: houseId });
    // delete house from server and on subscribe return it back
    this.houseService.remove(houseId)
      .subscribe( // delete house from array
        () => this.houses.splice(deleteIndex, 1),
        (err: HttpErrorResponse) => { // if errors
          // TODO: Error message
          console.log(err.error);
        }
      );
  }
  ngOnInit() {
    // Check if houseId is provided. If falsy then
    // this.router.navigate(['']); <- for flats !

    // get house list from server
    this.houseService.get()
      .subscribe( // and put it into houses array to display
        (data: Array<House>) => this.houses = data,
        (err: HttpErrorResponse) => { // if errors
          // TODO: Error message
          console.log(err.error);
        });
  }

}
