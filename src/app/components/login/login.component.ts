import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ValidateLoginService } from './validate-login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


/**
 * used to custom validation
 * @returns ValidatorFn
 * Check and validate the forbidden char
 */
export function forbiddenChareterValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = control.value ? control
      .value.toString()
      .split('')
      .filter(x => (x.toLowerCase() === 'o' || x === 'i' || x === 'l')) : [];

    return forbidden.length > 0 ? { 'forbiddenChareter': forbidden } : null;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  customErrorMessage = '';

  constructor(private validatePassword: ValidateLoginService,
    private fb: FormBuilder, private router: Router,
    private snackBar: MatSnackBar) {
    if (sessionStorage.getItem('login') === 'done') {
      this.router.navigate(['jokes']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.compose([Validators.required,
      Validators.maxLength(32),
      Validators.pattern('[a-z]*'),
      forbiddenChareterValidator(),
      ])
      ]
    });
  }
  // convenience getter for easy access to form fields
  get frm() { return this.loginForm.controls; }

  /**
   * USed to reset the login form
   */
  resetForm = () => {
    this.loginForm.reset();
    this.customErrorMessage = '';
  }

  /**
   * Used to handle login
   * Check if from is valide OR not
   * if from is valid  then check the Pattern id it conatains then continue Otherwise show error
   */
  onLoginClickHandler = () => {
    if (this.loginForm.valid) {
      if (this.validatePassword.isPasswordContainPattern(this.loginForm.controls.password.value)) {

        if (this.validatePassword.isPasswordContainSameLetterTwice(this.loginForm.controls.password.value)) {
           sessionStorage.setItem('login', 'done');
           this.router.navigate(['jokes']);
          // Show the snack bar
          this.snackBar.open('Login successful', null, {
            duration: 2000,
          });
        } else {
          this.customErrorMessage = 'Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc';
        }


      } else {

        // this.isPasswordInValid = true;
        this.customErrorMessage = 'Password must include one increasing straight of at least three letters, like abc , cde , fgh.';

      }
    }
  }
}
