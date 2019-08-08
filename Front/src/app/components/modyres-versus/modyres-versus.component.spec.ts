import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModyresVersusComponent } from './modyres-versus.component';

describe('ModyresVersusComponent', () => {
  let component: ModyresVersusComponent;
  let fixture: ComponentFixture<ModyresVersusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModyresVersusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModyresVersusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
