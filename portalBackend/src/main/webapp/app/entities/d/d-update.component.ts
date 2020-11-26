import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ID, D } from 'app/shared/model/d.model';
import { DService } from './d.service';

@Component({
  selector: 'jhi-d-update',
  templateUrl: './d-update.component.html',
})
export class DUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected dService: DService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ d }) => {
      this.updateForm(d);
    });
  }

  updateForm(d: ID): void {
    this.editForm.patchValue({
      id: d.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const d = this.createFromForm();
    if (d.id !== undefined) {
      this.subscribeToSaveResponse(this.dService.update(d));
    } else {
      this.subscribeToSaveResponse(this.dService.create(d));
    }
  }

  private createFromForm(): ID {
    return {
      ...new D(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ID>>): void {
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
}
