import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaprotocoloComponent } from './consultaprotocolo.component';

describe('ConsultaprotocoloComponent', () => {
  let component: ConsultaprotocoloComponent;
  let fixture: ComponentFixture<ConsultaprotocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaprotocoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaprotocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
