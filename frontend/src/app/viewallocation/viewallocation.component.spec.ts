import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallocationComponent } from './viewallocation.component';

describe('ViewallocationComponent', () => {
  let component: ViewallocationComponent;
  let fixture: ComponentFixture<ViewallocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewallocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
