import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/Member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + `users/${id}`);
  }

  getMembersByUsername(username: string): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + `users/${username}`);
  }
}
