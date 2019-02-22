import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ValidateLoginService } from './validate-login.service';

/**
 * used to custom validation
 * @returns ValidatorFn
 * Check and validate the forbidden char
 */
export const forbiddenCharacterValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = control.value ? control
      .value.toString()
      .split('')
      .filter((x: String) => (x.toLowerCase() === 'o' || x === 'i' || x === 'l')) : [];

    return forbidden.length > 0 ? { 'forbiddenCharacter': forbidden } : null;
  };
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  customErrorMessage: String = '';
  @Output() loginDone: EventEmitter<boolean> = new EventEmitter();

  constructor(private validatePassword: ValidateLoginService,
    private fb: FormBuilder) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.compose([Validators.required,
      Validators.maxLength(32),
      Validators.pattern('[a-z]*'),
      forbiddenCharacterValidator(),
      ])
      ]
    });
  }
  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get frm() { return this.loginForm.controls; }

  /**
   * USed to reset the login form
   */
  resetForm = (): void => {
    this.loginForm.reset();
    this.customErrorMessage = '';
  }

  /**
   * Used to handle login
   * Check if from is valid OR not
   * if from is valid  then check the Pattern id it contains then continue Otherwise show error
   */
  loginClicked = () => {
    if (this.loginForm.valid) {
      if (this.validatePassword.isPasswordContainPattern(this.loginForm.controls.password.value)) {

        if (this.validatePassword.isPasswordContainSameLetterTwice(this.loginForm.controls.password.value)) {
          this.loginDone.emit(true);
        } else {
          this.customErrorMessage = 'Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc';
        }

      } else {
        this.customErrorMessage = 'Password must include one increasing straight of at least three letters, like abc , cde , fgh.';

      }

    }

  }

}
