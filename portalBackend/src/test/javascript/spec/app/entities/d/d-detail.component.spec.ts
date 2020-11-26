import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PortalBackendTestModule } from '../../../test.module';
import { DDetailComponent } from 'app/entities/d/d-detail.component';
import { D } from 'app/shared/model/d.model';

describe('Component Tests', () => {
  describe('D Management Detail Component', () => {
    let comp: DDetailComponent;
    let fixture: ComponentFixture<DDetailComponent>;
    const route = ({ data: of({ d: new D(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalBackendTestModule],
        declarations: [DDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load d on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.d).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
