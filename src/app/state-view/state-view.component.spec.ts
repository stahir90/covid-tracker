import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateViewComponent } from './state-view.component';

describe('StateViewComponent', () => {
  let component: StateViewComponent;
  let fixture: ComponentFixture<StateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
