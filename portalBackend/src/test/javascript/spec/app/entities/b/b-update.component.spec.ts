import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PortalBackendTestModule } from '../../../test.module';
import { BUpdateComponent } from 'app/entities/b/b-update.component';
import { BService } from 'app/entities/b/b.service';
import { B } from 'app/shared/model/b.model';

describe('Component Tests', () => {
  describe('B Management Update Component', () => {
    let comp: BUpdateComponent;
    let fixture: ComponentFixture<BUpdateComponent>;
    let service: BService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalBackendTestModule],
        declarations: [BUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new B(123);
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
        const entity = new B();
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
