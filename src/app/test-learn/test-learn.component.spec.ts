import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLearnComponent } from './test-learn.component';

describe('TestLearnComponent', () => {
  let component: TestLearnComponent;
  let fixture: ComponentFixture<TestLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestLearnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
