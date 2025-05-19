import { Component, inject } from '@angular/core';
import { PRIVATE_NAV_LINKS, PUBLIC_NAV_LINKS } from '../../constants/constants';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-burger-menu',
  imports: [ButtonComponent, CommonModule],
  standalone: true,
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.css',
})
export class BurgerMenuComponent {
  isOpen: boolean = false;
  PRIVATE_NAVLINKS = PRIVATE_NAV_LINKS;
  PUBLIC_NAV_LINKS = PUBLIC_NAV_LINKS;
  accountService = inject(AccountService);

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
