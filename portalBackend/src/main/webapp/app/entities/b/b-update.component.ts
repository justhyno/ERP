import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IB, B } from 'app/shared/model/b.model';
import { BService } from './b.service';
import { IA } from 'app/shared/model/a.model';
import { AService } from 'app/entities/a/a.service';

@Component({
  selector: 'jhi-b-update',
  templateUrl: './b-update.component.html',
})
export class BUpdateComponent implements OnInit {
  isSaving = false;
  as: IA[] = [];

  editForm = this.fb.group({
    id: [],
    a: [],
  });

  constructor(
    protected bService: BService,
    protected aService: AService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ b }) => {
      this.updateForm(b);

      this.aService.query().subscribe((res: HttpResponse<IA[]>) => (this.as = res.body || []));
    });
  }

  updateForm(b: IB): void {
    this.editForm.patchValue({
      id: b.id,
      a: b.a,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const b = this.createFromForm();
    if (b.id !== undefined) {
      this.subscribeToSaveResponse(this.bService.update(b));
    } else {
      this.subscribeToSaveResponse(this.bService.create(b));
    }
  }

  private createFromForm(): IB {
    return {
      ...new B(),
      id: this.editForm.get(['id'])!.value,
      a: this.editForm.get(['a'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IB>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IA): any {
    return item.id;
  }
}
