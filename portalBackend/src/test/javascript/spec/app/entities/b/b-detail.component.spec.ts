import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PortalBackendTestModule } from '../../../test.module';
import { BDetailComponent } from 'app/entities/b/b-detail.component';
import { B } from 'app/shared/model/b.model';

describe('Component Tests', () => {
  describe('B Management Detail Component', () => {
    let comp: BDetailComponent;
    let fixture: ComponentFixture<BDetailComponent>;
    const route = ({ data: of({ b: new B(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalBackendTestModule],
        declarations: [BDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load b on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.b).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
