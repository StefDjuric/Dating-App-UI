import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ButtonComponent, ReactiveFormsModule, NgClass],
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  accountService = inject(AccountService);
  router: Router = inject(Router);
  toastr = inject(ToastrService);
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
      ]),
      gender: new FormControl('male'),
      knownAs: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.matchValues('password'),
      ]),
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () =>
        this.registerForm.controls['confirmPassword'].updateValueAndValidity(),
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { isMatching: true };
    };
  }

  register() {
    const dateOfBirth = this.getDateOnly(
      this.registerForm.get('dateOfBirth')?.value
    );

    this.registerForm.patchValue({ dateOfBirth: dateOfBirth });
    this.accountService.register(this.registerForm.value).subscribe({
      next: (_) => this.router.navigateByUrl('/members'),
      error: (err) => {
        this.validationErrors = err;
      },
    });
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    return new Date(dob).toISOString().slice(0, 10);
  }
}
