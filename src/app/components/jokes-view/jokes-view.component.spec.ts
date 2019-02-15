import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesViewComponent } from './jokes-view.component';

describe('JokesViewComponent', () => {
  let component: JokesViewComponent;
  let fixture: ComponentFixture<JokesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JokesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
