import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IB } from 'app/shared/model/b.model';

@Component({
  selector: 'jhi-b-detail',
  templateUrl: './b-detail.component.html',
})
export class BDetailComponent implements OnInit {
  b: IB | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ b }) => (this.b = b));
  }

  previousState(): void {
    window.history.back();
  }
}
