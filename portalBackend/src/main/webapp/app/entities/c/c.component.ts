import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IC } from 'app/shared/model/c.model';
import { CService } from './c.service';
import { CDeleteDialogComponent } from './c-delete-dialog.component';

@Component({
  selector: 'jhi-c',
  templateUrl: './c.component.html',
})
export class CComponent implements OnInit, OnDestroy {
  cs?: IC[];
  eventSubscriber?: Subscription;

  constructor(protected cService: CService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cService.query().subscribe((res: HttpResponse<IC[]>) => (this.cs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCS();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IC): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCS(): void {
    this.eventSubscriber = this.eventManager.subscribe('cListModification', () => this.loadAll());
  }

  delete(c: IC): void {
    const modalRef = this.modalService.open(CDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.c = c;
  }
}
