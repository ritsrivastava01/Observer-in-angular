
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
  title = 'front-man';
  ngOnInit() {
    this.isSuccessfulLogin = sessionStorage.getItem('login') ? true : false;
    this.redirectToJokesPage('You are already Logged in');
  }

  logoutClickedHandler = () => {
    sessionStorage.removeItem('login');
    this.isSuccessfulLogin = !this.isSuccessfulLogin;
    this.router.navigate(['']);
    this.showSnackBar('You Logged out successfully');
  }

  loginDoneHandler = (loginResult: boolean) => {
    sessionStorage.setItem('login', 'done');
    this.isSuccessfulLogin = loginResult;
    this.redirectToJokesPage('You are logged in successfully');
  }

  redirectToJokesPage = (snackBarMessage) => {
    if (this.isSuccessfulLogin) {
      this.router.navigate(['jokes']);
      this.showSnackBar(snackBarMessage);
    }
  }

  showSnackBar = (snackBarMessage: string) => {
    this.snackBar.open(snackBarMessage, null, {
      duration: 2000,
    });
  }
}
