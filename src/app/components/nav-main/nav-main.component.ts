import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-main',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.scss',
})
export class NavMainComponent {
  constructor(private _Router: Router) {}

  signOut(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
}
