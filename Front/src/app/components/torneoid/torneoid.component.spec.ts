import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoidComponent } from './torneoid.component';

describe('TorneoidComponent', () => {
  let component: TorneoidComponent;
  let fixture: ComponentFixture<TorneoidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorneoidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorneoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
