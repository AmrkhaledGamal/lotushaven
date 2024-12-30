import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterAuthComponent } from '../../components/footer-auth/footer-auth.component';
import { NavAuthComponent } from '../../components/nav-auth/nav-auth.component';

@Component({
  selector: 'app-auth-layout',
  imports: [NavAuthComponent, RouterOutlet, FooterAuthComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
