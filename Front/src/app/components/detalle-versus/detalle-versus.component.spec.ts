import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVersusComponent } from './detalle-versus.component';

describe('DetalleVersusComponent', () => {
  let component: DetalleVersusComponent;
  let fixture: ComponentFixture<DetalleVersusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleVersusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleVersusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
