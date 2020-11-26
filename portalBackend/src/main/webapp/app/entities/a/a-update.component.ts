import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IA, A } from 'app/shared/model/a.model';
import { AService } from './a.service';

@Component({
  selector: 'jhi-a-update',
  templateUrl: './a-update.component.html',
})
export class AUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected aService: AService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ a }) => {
      this.updateForm(a);
    });
  }

  updateForm(a: IA): void {
    this.editForm.patchValue({
      id: a.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const a = this.createFromForm();
    if (a.id !== undefined) {
      this.subscribeToSaveResponse(this.aService.update(a));
    } else {
      this.subscribeToSaveResponse(this.aService.create(a));
    }
  }

  private createFromForm(): IA {
    return {
      ...new A(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IA>>): void {
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
