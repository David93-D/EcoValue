import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriptoAnalisisComponent } from './cripto-analisis.component';

describe('CriptoAnalisisComponent', () => {
  let component: CriptoAnalisisComponent;
  let fixture: ComponentFixture<CriptoAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriptoAnalisisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriptoAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
