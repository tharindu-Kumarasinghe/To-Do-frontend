import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcoommingTaskComponent } from './upcoomming-task.component';

describe('UpcoommingTaskComponent', () => {
  let component: UpcoommingTaskComponent;
  let fixture: ComponentFixture<UpcoommingTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcoommingTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcoommingTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
