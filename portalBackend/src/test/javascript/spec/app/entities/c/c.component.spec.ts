import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PortalBackendTestModule } from '../../../test.module';
import { CComponent } from 'app/entities/c/c.component';
import { CService } from 'app/entities/c/c.service';
import { C } from 'app/shared/model/c.model';

describe('Component Tests', () => {
  describe('C Management Component', () => {
    let comp: CComponent;
    let fixture: ComponentFixture<CComponent>;
    let service: CService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalBackendTestModule],
        declarations: [CComponent],
      })
        .overrideTemplate(CComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new C(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cs && comp.cs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
