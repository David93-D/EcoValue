import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOperacionesComponent } from './dialog-operaciones.component';

describe('DialogOperacionesComponent', () => {
  let component: DialogOperacionesComponent;
  let fixture: ComponentFixture<DialogOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOperacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
