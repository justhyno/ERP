import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IC, C } from 'app/shared/model/c.model';
import { CService } from './c.service';

@Component({
  selector: 'jhi-c-update',
  templateUrl: './c-update.component.html',
})
export class CUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected cService: CService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ c }) => {
      this.updateForm(c);
    });
  }

  updateForm(c: IC): void {
    this.editForm.patchValue({
      id: c.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const c = this.createFromForm();
    if (c.id !== undefined) {
      this.subscribeToSaveResponse(this.cService.update(c));
    } else {
      this.subscribeToSaveResponse(this.cService.create(c));
    }
  }

  private createFromForm(): IC {
    return {
      ...new C(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IC>>): void {
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
