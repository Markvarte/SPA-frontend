import { Component, OnInit, Input } from '@angular/core';
import { House, DefaultHouse } from '../house-interface/default-house';
import { HouseServiceService } from '../house-service.service';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {
  public houses: Array<House>; // Array of Houses, which will be displayed
  public defaultHouse: House; // for initializing default values (null and empty strings)
  constructor(
    private houseService: HouseServiceService, // for sending requests to server
  ) {
    this.defaultHouse = new DefaultHouse(); // initializing default values (null and empty strings)
  }

  public deleteHouse(houseId: number) {
    const deleteIndex = _.findIndex(this.houses, { id: houseId }); // я забыла как без lodash и не могу придумать
    this.houseService.remove(houseId).subscribe( // delete house from server and on subscribe return it back
      () => this.houses.splice(deleteIndex, 1) // delete house from array
    );
  }
  ngOnInit() {
    this.houseService.get().subscribe((data: Array<House>) => this.houses = data); // get house list from server
    // and put it into houses array to display
  }

}
