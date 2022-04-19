import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresAnalisisComponent } from './valores-analisis.component';

describe('ValoresAnalisisComponent', () => {
  let component: ValoresAnalisisComponent;
  let fixture: ComponentFixture<ValoresAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValoresAnalisisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
