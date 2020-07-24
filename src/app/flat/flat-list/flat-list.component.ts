import { Component, OnInit } from '@angular/core';
import { Flat, DefaultFlat } from '../flat-interface/default-flat';
import { FlatService } from '../flat.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '@app/modal/delete-modal/delete-modal.component';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.component.html',
  styleUrls: ['./flat-list.component.css']
})
export class FlatListComponent implements OnInit {


  currentHouseId: number;
  flats: Array<Flat>;
  // Array of Flats, which will be displayed
  defaultFlat: Flat;
  // For initializing default values (all null)
  constructor(
    private flatService: FlatService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
  ) {
    // Initializing default values
    this.defaultFlat = new DefaultFlat();
  }
  open(id: number) {
    const confirmModal = this.modalService.open(DeleteModalComponent);
    confirmModal.result.then(() => {
      this.deleteFlat(id);
    }, () => { });
  }

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
      //  '+' === 'parseToInt(...)'
      this.currentHouseId = +param.houseId;
      if (this.currentHouseId) {
        this.getFlatsFromServer(this.currentHouseId);
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
