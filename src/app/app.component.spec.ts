import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginModule } from './components/login/login.module';
import { MatToolbarModule, MatSnackBarModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LoginModule,
        MatToolbarModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
        app.isSuccessfulLogin = false;
        fixture.detectChanges();
      });
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  it('should toggle the login window', () => {
    expect(app.isSuccessfulLogin).toBe(false);
    expect(fixture.debugElement.query(By.directive(LoginComponent))).toBeTruthy();
    app.isSuccessfulLogin = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(LoginComponent))).toBeFalsy();
  });

  it('should handle the logout function', () => {
    app.isSuccessfulLogin = true;
    expect(app.isSuccessfulLogin).toBe(true);
    app.logoutClickedHandler();
    fixture.detectChanges();
    expect(app.isSuccessfulLogin).toBe(false);
  });

  it('should handle login done function',() => {
    app.isSuccessfulLogin = false;
    expect(fixture.debugElement.query(By.directive(LoginComponent))).toBeTruthy();
    app.loginDoneHandler(true);
    fixture.detectChanges();
    expect(app.isSuccessfulLogin).toBe(false);
    expect(fixture.debugElement.query(By.directive(LoginComponent))).toBeFalsy();
  })
});
