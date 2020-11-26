import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ID } from 'app/shared/model/d.model';
import { DService } from './d.service';
import { DDeleteDialogComponent } from './d-delete-dialog.component';

@Component({
  selector: 'jhi-d',
  templateUrl: './d.component.html',
})
export class DComponent implements OnInit, OnDestroy {
  ds?: ID[];
  eventSubscriber?: Subscription;

  constructor(protected dService: DService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.dService.query().subscribe((res: HttpResponse<ID[]>) => (this.ds = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDS();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ID): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDS(): void {
    this.eventSubscriber = this.eventManager.subscribe('dListModification', () => this.loadAll());
  }

  delete(d: ID): void {
    const modalRef = this.modalService.open(DDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.d = d;
  }
}
