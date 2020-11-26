import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IA } from 'app/shared/model/a.model';
import { AService } from './a.service';
import { ADeleteDialogComponent } from './a-delete-dialog.component';

@Component({
  selector: 'jhi-a',
  templateUrl: './a.component.html',
})
export class AComponent implements OnInit, OnDestroy {
  as?: IA[];
  eventSubscriber?: Subscription;

  constructor(protected aService: AService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.aService.query().subscribe((res: HttpResponse<IA[]>) => (this.as = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAS();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IA): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAS(): void {
    this.eventSubscriber = this.eventManager.subscribe('aListModification', () => this.loadAll());
  }

  delete(a: IA): void {
    const modalRef = this.modalService.open(ADeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.a = a;
  }
}
