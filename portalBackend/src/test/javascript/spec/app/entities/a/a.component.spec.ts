import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PortalBackendTestModule } from '../../../test.module';
import { AComponent } from 'app/entities/a/a.component';
import { AService } from 'app/entities/a/a.service';
import { A } from 'app/shared/model/a.model';

describe('Component Tests', () => {
  describe('A Management Component', () => {
    let comp: AComponent;
    let fixture: ComponentFixture<AComponent>;
    let service: AService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalBackendTestModule],
        declarations: [AComponent],
      })
        .overrideTemplate(AComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new A(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.as && comp.as[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
