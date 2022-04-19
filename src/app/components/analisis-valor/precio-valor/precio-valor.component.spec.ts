import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioValorComponent } from './precio-valor.component';

describe('PrecioValorComponent', () => {
  let component: PrecioValorComponent;
  let fixture: ComponentFixture<PrecioValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioValorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
