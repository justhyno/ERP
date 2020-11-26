import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IA } from 'app/shared/model/a.model';
import { AService } from './a.service';

@Component({
  templateUrl: './a-delete-dialog.component.html',
})
export class ADeleteDialogComponent {
  a?: IA;

  constructor(protected aService: AService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.aService.delete(id).subscribe(() => {
      this.eventManager.broadcast('aListModification');
      this.activeModal.close();
    });
  }
}
