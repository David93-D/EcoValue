import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioCriptoComponent } from './precio-cripto.component';

describe('PrecioCriptoComponent', () => {
  let component: PrecioCriptoComponent;
  let fixture: ComponentFixture<PrecioCriptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioCriptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioCriptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
