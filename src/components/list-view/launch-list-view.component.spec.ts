import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchListViewComponent } from './launch-list-view.component';

describe('ListViewComponent', () => {
  let component: LaunchListViewComponent;
  let fixture: ComponentFixture<LaunchListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchListViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
