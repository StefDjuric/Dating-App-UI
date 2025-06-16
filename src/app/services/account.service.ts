import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/User';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterDTO } from '../models/RegisterDTO';
import { LikeService } from './like.service';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  private router = inject(Router);
  private likeService = inject(LikeService);
  currentUser = signal<User | null>(null);
  roles = computed(() => {
    const user = this.currentUser();
    if (user && user.token) {
      const role = JSON.parse(atob(user.token.split('.')[1])).role;
      return Array.isArray(role) ? role : [role];
    }
    return [];
  });

  login(model: { usernameOrEmail: string; password: string }) {
    return this.http
      .post<User>(this.baseUrl + 'accountmanager/login', model)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.set(user);
            this.likeService.getLikeIds();
          }
          return user;
        })
      );
  }

  register(model: RegisterDTO) {
    return this.http
      .post<User>(this.baseUrl + 'accountmanager/register', model, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
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
    this.router.navigateByUrl('/home');
  }
}
