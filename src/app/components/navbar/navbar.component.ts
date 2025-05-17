import { Component } from '@angular/core';
import { NAV_LINKS } from '../../constants/constants';
import { ButtonComponent } from '../button/button.component';
import { BurgerMenuComponent } from '../burger-menu/burger-menu.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent, BurgerMenuComponent, RouterLink],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  NAV_LINKS = NAV_LINKS;
}
