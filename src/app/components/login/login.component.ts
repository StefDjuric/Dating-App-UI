import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, ReactiveFormsModule, NgClass],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  private router: Router = inject(Router);
  accountService = inject(AccountService);
  toastr = inject(ToastrService);
  validationErrors: string[] | undefined;

  ngOnInit(): void {
    this.initializeForm();
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: (_) => {
        this.router.navigateByUrl('/members');
      },
      error: (err) => {
        console.log('Login error:', err);
        this.validationErrors = this.extractErrorMessages(err);
      },
    });
  }

  logout() {
    this.accountService.logout();
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      emailOrUsername: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  private extractErrorMessages(error: any): string[] {
    if (Array.isArray(error)) {
      return error;
    }

    if (error?.error) {
      if (typeof error.error === 'string') {
        return [error.error];
      }

      if (error.error.errors) {
        return Object.values(error.error.errors).flat() as string[];
      }

      if (error.error.message) {
        return [error.error.message];
      }
    }

    if (error?.message) {
      return [error.message];
    }

    if (error?.statusText) {
      return [error.statusText];
    }

    return [error?.toString() || 'An unknown error occurred'];
  }
}
