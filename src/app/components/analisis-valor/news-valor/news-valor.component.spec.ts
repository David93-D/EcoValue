import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsValorComponent } from './news-valor.component';

describe('NewsValorComponent', () => {
  let component: NewsValorComponent;
  let fixture: ComponentFixture<NewsValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsValorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
