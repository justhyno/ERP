import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IB } from 'app/shared/model/b.model';
import { BService } from './b.service';

@Component({
  templateUrl: './b-delete-dialog.component.html',
})
export class BDeleteDialogComponent {
  b?: IB;

  constructor(protected bService: BService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bService.delete(id).subscribe(() => {
      this.eventManager.broadcast('bListModification');
      this.activeModal.close();
    });
  }
}
