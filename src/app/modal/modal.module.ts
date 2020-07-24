import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
  ],
  declarations: [DeleteModalComponent],
  entryComponents: [DeleteModalComponent]
})
export class ModalModule { }
