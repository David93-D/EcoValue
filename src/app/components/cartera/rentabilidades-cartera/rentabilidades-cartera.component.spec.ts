import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentabilidadesCarteraComponent } from './rentabilidades-cartera.component';

describe('RentabilidadesCarteraComponent', () => {
  let component: RentabilidadesCarteraComponent;
  let fixture: ComponentFixture<RentabilidadesCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentabilidadesCarteraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentabilidadesCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
