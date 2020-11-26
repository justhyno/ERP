import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PortalBackendTestModule } from '../../../test.module';
import { DUpdateComponent } from 'app/entities/d/d-update.component';
import { DService } from 'app/entities/d/d.service';
import { D } from 'app/shared/model/d.model';

describe('Component Tests', () => {
  describe('D Management Update Component', () => {
    let comp: DUpdateComponent;
    let fixture: ComponentFixture<DUpdateComponent>;
    let service: DService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalBackendTestModule],
        declarations: [DUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new D(123);
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
        const entity = new D();
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
