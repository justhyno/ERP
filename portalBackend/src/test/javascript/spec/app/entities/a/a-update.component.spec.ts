import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PortalBackendTestModule } from '../../../test.module';
import { AUpdateComponent } from 'app/entities/a/a-update.component';
import { AService } from 'app/entities/a/a.service';
import { A } from 'app/shared/model/a.model';

describe('Component Tests', () => {
  describe('A Management Update Component', () => {
    let comp: AUpdateComponent;
    let fixture: ComponentFixture<AUpdateComponent>;
    let service: AService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalBackendTestModule],
        declarations: [AUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new A(123);
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
        const entity = new A();
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
