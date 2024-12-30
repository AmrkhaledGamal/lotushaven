import { Component } from '@angular/core';
import { NavMainComponent } from '../../components/nav-main/nav-main.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [NavMainComponent, RouterOutlet, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  scrollUp: boolean = false;

  constructor() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        this.scrollUp = true;
      } else {
        this.scrollUp = false;
      }
    });
  }

  scrollTop(): void {
    window.scroll({
      top: 0,
    });
  }
}
