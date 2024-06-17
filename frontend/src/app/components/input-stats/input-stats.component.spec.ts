import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStatsComponent } from './input-stats.component';

describe('InputStatsComponent', () => {
  let component: InputStatsComponent;
  let fixture: ComponentFixture<InputStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
