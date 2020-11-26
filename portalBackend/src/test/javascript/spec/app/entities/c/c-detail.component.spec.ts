import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PortalBackendTestModule } from '../../../test.module';
import { CDetailComponent } from 'app/entities/c/c-detail.component';
import { C } from 'app/shared/model/c.model';

describe('Component Tests', () => {
  describe('C Management Detail Component', () => {
    let comp: CDetailComponent;
    let fixture: ComponentFixture<CDetailComponent>;
    const route = ({ data: of({ c: new C(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PortalBackendTestModule],
        declarations: [CDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load c on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.c).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
