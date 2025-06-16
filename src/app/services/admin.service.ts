import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/User';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  getUserRoles() {
    return this.http.get<any[]>(this.baseUrl + 'admin/users-with-roles').pipe(
      map((users) =>
        users.map((user) => ({
          ...user,
          roles: this.extractRoleNames(user.roles),
        }))
      )
    );
  }

  private extractRoleNames(roles: any): string[] {
    if (Array.isArray(roles)) {
      // If it's an array of role objects
      if (roles.length > 0 && typeof roles[0] === 'object' && roles[0].name) {
        return roles.map((r: any) => r.name);
      }
      // If it's already an array of strings
      return roles;
    }
    // If it's a comma-separated string
    if (typeof roles === 'string') return roles.split(',');
    // Fallback for unexpected formats
    return [];
  }

  editRoles(username: string, roles: string) {
    const params = new HttpParams().set('roles', roles);
    return this.http
      .post<any>(this.baseUrl + `admin/edit-roles/${username}`, {}, { params })
      .pipe(
        map((response) => this.extractRoleNames(response.roles || response))
      );
  }
}
