import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KittenComponent } from './kitten.component';

describe('KittenComponent', () => {
  let component: KittenComponent;
  let fixture: ComponentFixture<KittenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KittenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KittenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
