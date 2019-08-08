import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoidComponent } from './foroid.component';

describe('ForoidComponent', () => {
  let component: ForoidComponent;
  let fixture: ComponentFixture<ForoidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
