import { Component, inject } from '@angular/core';
import { PRIVATE_NAV_LINKS, PUBLIC_NAV_LINKS } from '../../constants/constants';
import { ButtonComponent } from '../button/button.component';
import { BurgerMenuComponent } from '../burger-menu/burger-menu.component';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { HasRoleDirective } from '../../directives/has-role.directive';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent, BurgerMenuComponent, RouterLink, HasRoleDirective],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  PRIVATE_NAV_LINKS = PRIVATE_NAV_LINKS;
  PUBLIC_NAV_LINKS = PUBLIC_NAV_LINKS;
  accountService = inject(AccountService);
}
