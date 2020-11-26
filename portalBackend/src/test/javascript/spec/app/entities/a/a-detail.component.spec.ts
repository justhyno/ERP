import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PortalBackendTestModule } from '../../../test.module';
import { ADetailComponent } from 'app/entities/a/a-detail.component';
import { A } from 'app/shared/model/a.model';

describe('Component Tests', () => {
  describe('A Management Detail Component', () => {
    let comp: ADetailComponent;
    let fixture: ComponentFixture<ADetailComponent>;
    const route = ({ data: of({ a: new A(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalBackendTestModule],
        declarations: [ADetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ADetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ADetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load a on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.a).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
