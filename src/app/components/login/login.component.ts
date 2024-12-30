import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  masErr: string = '';
  regSpinner: boolean = false;

  loginForm: FormGroup = inject(FormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],
    ],
  });

  submitForm(): void {
    const userData = this.loginForm.value;
    this.regSpinner = true;
    if (this.loginForm.valid) {
      this._AuthService.signIn(userData).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            localStorage.setItem('token', res.token);
            this._AuthService.decodeToken();
            this.regSpinner = false;
            this._Router.navigate(['/home']);
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
