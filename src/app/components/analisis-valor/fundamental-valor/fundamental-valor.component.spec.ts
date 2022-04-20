import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentalValorComponent } from './fundamental-valor.component';

describe('FundamentalValorComponent', () => {
  let component: FundamentalValorComponent;
  let fixture: ComponentFixture<FundamentalValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundamentalValorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundamentalValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
