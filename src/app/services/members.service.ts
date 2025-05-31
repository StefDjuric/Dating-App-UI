import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/Member';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  members = signal<Member[]>([]);

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
      next: (response) => this.members.set(response),
    });
  }

  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + `users/${id}`);
  }

  getMemberByUsername(username: string): Observable<Member> {
    const member = this.members().find((m) => m.username === username);

    if (member !== undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + `users/${username}`);
  }

  updateUserDetails(model: Member) {
    return this.http.put(this.baseUrl + 'users/edit-member', model).pipe(
      tap(() => {
        this.members.update((members) =>
          members.map((m) => (m.username === model.username ? model : m))
        );
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(
      this.baseUrl + `users/set-main-photo/${photoId}`,
      photoId
    );
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + `users/delete-photo/${photoId}`);
  }
}
