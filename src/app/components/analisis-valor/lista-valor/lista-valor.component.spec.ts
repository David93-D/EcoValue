import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaValorComponent } from './lista-valor.component';

describe('ListaValorComponent', () => {
  let component: ListaValorComponent;
  let fixture: ComponentFixture<ListaValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaValorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
