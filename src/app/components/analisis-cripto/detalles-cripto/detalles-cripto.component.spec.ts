import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCriptoComponent } from './detalles-cripto.component';

describe('DetallesCriptoComponent', () => {
  let component: DetallesCriptoComponent;
  let fixture: ComponentFixture<DetallesCriptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesCriptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesCriptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
