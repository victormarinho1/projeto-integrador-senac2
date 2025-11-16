import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtenderDenunciaComponent } from './atender-denuncia.component';

describe('AtenderDenunciaComponent', () => {
  let component: AtenderDenunciaComponent;
  let fixture: ComponentFixture<AtenderDenunciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtenderDenunciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtenderDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
