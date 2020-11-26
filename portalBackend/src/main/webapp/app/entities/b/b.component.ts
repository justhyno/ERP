import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IB } from 'app/shared/model/b.model';
import { BService } from './b.service';
import { BDeleteDialogComponent } from './b-delete-dialog.component';

@Component({
  selector: 'jhi-b',
  templateUrl: './b.component.html',
})
export class BComponent implements OnInit, OnDestroy {
  bs?: IB[];
  eventSubscriber?: Subscription;

  constructor(protected bService: BService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.bService.query().subscribe((res: HttpResponse<IB[]>) => (this.bs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBS();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IB): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBS(): void {
    this.eventSubscriber = this.eventManager.subscribe('bListModification', () => this.loadAll());
  }

  delete(b: IB): void {
    const modalRef = this.modalService.open(BDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.b = b;
  }
}
