import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosicionesCarteraComponent } from './posiciones-cartera.component';

describe('PosicionesCarteraComponent', () => {
  let component: PosicionesCarteraComponent;
  let fixture: ComponentFixture<PosicionesCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosicionesCarteraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosicionesCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
