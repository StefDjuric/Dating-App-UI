import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  imports: [ButtonComponent, FormsModule],
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  accountService = inject(AccountService);
  model: any = {};
  toastr = inject(ToastrService);

  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => console.log(response),
      error: (err) => {
        console.log(err), this.toastr.error(err.error);
      },
    });
  }
}
