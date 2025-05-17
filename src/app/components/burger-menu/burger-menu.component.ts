import { Component } from '@angular/core';
import { NAV_LINKS } from '../../constants/constants';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-burger-menu',
  imports: [ButtonComponent, CommonModule],
  standalone: true,
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.css',
})
export class BurgerMenuComponent {
  isOpen: boolean = false;
  NAVLINKS = NAV_LINKS;

  toggleMenu(): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  }

  closeMenu(): void {
    this.isOpen = false;
    document.body.classList.remove('overflow-hidden');
  }
}
