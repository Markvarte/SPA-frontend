import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultUrlSerializer } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @Input() delete: boolean;
  constructor(public activeModal: NgbActiveModal) {
    this.delete = false;
  }

  ok() {
    this.activeModal.close(true);
  }
  cancel() {
    this.activeModal.dismiss();
  }

  ngOnInit() {
  }

}
