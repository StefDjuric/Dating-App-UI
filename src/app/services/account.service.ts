import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environment/environment';
import { User } from '../models/models';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private tokenKey = environment.tokenKey;
  private baseUrl = environment.baseUrl;
  currentUser = signal<User | null>(null);

  login(model: { username: string; password: string }) {
    return this.http
      .post<User>(this.baseUrl + 'accountmanager/login', model)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.set(user);
          }
        })
      );
  }

  register(model: { username: string; email: string; password: string }) {
    return this.http
      .post<User>(this.baseUrl + 'accountmanager/register', model)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.set(user);
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
