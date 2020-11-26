import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PortalBackendTestModule } from '../../../test.module';
import { DComponent } from 'app/entities/d/d.component';
import { DService } from 'app/entities/d/d.service';
import { D } from 'app/shared/model/d.model';

describe('Component Tests', () => {
  describe('D Management Component', () => {
    let comp: DComponent;
    let fixture: ComponentFixture<DComponent>;
    let service: DService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalBackendTestModule],
        declarations: [DComponent],
      })
        .overrideTemplate(DComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new D(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ds && comp.ds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
