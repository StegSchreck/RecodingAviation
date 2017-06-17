import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTimeComponent } from './manage-time.component';

describe('ManageTimeComponent', () => {
  let component: ManageTimeComponent;
  let fixture: ComponentFixture<ManageTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
