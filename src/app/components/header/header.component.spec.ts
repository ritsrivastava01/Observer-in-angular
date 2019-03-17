import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatToolbarModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the logout button', () => {
    component.isSuccessfulLogin = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.btn-logout'))).not.toBeNull();
  });

  it('should handle the logout click', () => {
    component.isSuccessfulLogin = true;
    fixture.debugElement.query(By.css('.btn-logout')).nativeElement.click();
    fixture.detectChanges();
    expect(component.isSuccessfulLogin).toBe(false);
  })
});
