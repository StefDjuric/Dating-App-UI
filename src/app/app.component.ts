import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  users: any;

  ngOnInit(): void {
    this.http.get('https://localhost:7204/api/users').subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => console.log('Error: ', err),
      complete: () => console.log('Request has completed.'),
    });
  }
}
