import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PortalBackendTestModule } from '../../../test.module';
import { CUpdateComponent } from 'app/entities/c/c-update.component';
import { CService } from 'app/entities/c/c.service';
import { C } from 'app/shared/model/c.model';

describe('Component Tests', () => {
  describe('C Management Update Component', () => {
    let comp: CUpdateComponent;
    let fixture: ComponentFixture<CUpdateComponent>;
    let service: CService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalBackendTestModule],
        declarations: [CUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new C(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new C();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
