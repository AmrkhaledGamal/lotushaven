import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  masErr: string = '';
  regSpinner: boolean = false;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/),
      ]),
      rePassword: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword } as FormControlOptions
  );
  confirmPassword(form: FormGroup): void {
    const password = form.get('password');
    const rePassword = form.get('rePassword');
    if (rePassword?.value == '') {
      rePassword.setErrors({ required: true });
    } else if (rePassword?.value != password?.value) {
      rePassword?.setErrors({ notEqual: true });
    }
  }
  submitForm(): void {
    const userData = this.registerForm.value;
    this.regSpinner = true;
    if (this.registerForm.valid) {
      this._AuthService.signUp(userData).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.regSpinner = false;
            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.regSpinner = false;
          this.masErr = err.error.message;
        },
      });
    }
  }
}
