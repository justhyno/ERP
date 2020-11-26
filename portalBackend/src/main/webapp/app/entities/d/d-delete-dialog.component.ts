import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ID } from 'app/shared/model/d.model';
import { DService } from './d.service';

@Component({
  templateUrl: './d-delete-dialog.component.html',
})
export class DDeleteDialogComponent {
  d?: ID;

  constructor(protected dService: DService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dService.delete(id).subscribe(() => {
      this.eventManager.broadcast('dListModification');
      this.activeModal.close();
    });
  }
}
