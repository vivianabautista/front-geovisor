import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiralGalaxyComponent } from './spiral-galaxy.component';

describe('SpiralGalaxyComponent', () => {
  let component: SpiralGalaxyComponent;
  let fixture: ComponentFixture<SpiralGalaxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpiralGalaxyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpiralGalaxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
