import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PortalBackendTestModule } from '../../../test.module';
import { BComponent } from 'app/entities/b/b.component';
import { BService } from 'app/entities/b/b.service';
import { B } from 'app/shared/model/b.model';

describe('Component Tests', () => {
  describe('B Management Component', () => {
    let comp: BComponent;
    let fixture: ComponentFixture<BComponent>;
    let service: BService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalBackendTestModule],
        declarations: [BComponent],
      })
        .overrideTemplate(BComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new B(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bs && comp.bs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
