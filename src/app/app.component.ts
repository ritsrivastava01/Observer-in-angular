
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isSuccessfulLogin: boolean;
  constructor(private router: Router, private snackBar: MatSnackBar) {

  }
  title: String = 'Observer In Angular';

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.isSuccessfulLogin = sessionStorage.getItem('login') ? true : false;
    this.redirectToJokesPage('You are already Logged in');
  }

  /**
   * Logout handler: Logout the application
   * and redirect to Login screen
   * @returns void
   */
  logoutClickedHandler = (): void => {
    sessionStorage.removeItem('login');
    this.isSuccessfulLogin = !this.isSuccessfulLogin;
    this.router.navigate(['']);
    this.showSnackBar('You Logged out successfully');
  }

  /**
   * Login handler: login the application
   * and redirect to Jokes screen
   * @returns void
   */
  loginDoneHandler = (loginResult: boolean): void => {
    sessionStorage.setItem('login', 'done');
    this.isSuccessfulLogin = loginResult;
    this.redirectToJokesPage('You are logged in successfully');
  }

  /**
   * Used to redirect to Jokes page
   * @param  {} snackBarMessage : Snackbar message
   * @returns void
   */
  private redirectToJokesPage = (snackBarMessage: string): void => {
    if (this.isSuccessfulLogin) {
      this.router.navigate(['jokes']);
      this.showSnackBar(snackBarMessage);
    }
  }

  /**
   * Used to show the snack bar message
   * @param  {string} snackBarMessage: snackbar message
   * @returns void
   */
  private showSnackBar = (snackBarMessage: string): void => {
    this.snackBar.open(snackBarMessage, null, {
      duration: 2000,
    });
  }
}
