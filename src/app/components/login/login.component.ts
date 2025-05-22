import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  model: any = {};
  accountService = inject(AccountService);
  private router = inject(Router);
  toastr = inject(ToastrService);

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('/members');
      },
      error: (err) => {
        this.toastr.error(err.error);
      },
    });
  }

  logout() {
    this.accountService.logout();
  }
}
