import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IC } from 'app/shared/model/c.model';
import { CService } from './c.service';

@Component({
  templateUrl: './c-delete-dialog.component.html',
})
export class CDeleteDialogComponent {
  c?: IC;

  constructor(protected cService: CService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cListModification');
      this.activeModal.close();
    });
  }
}
