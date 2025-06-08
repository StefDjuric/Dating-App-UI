import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../models/Member';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../models/Pagination';
import { UserParams } from '../models/UserParams';
import { AccountService } from './account.service';
import { setPaginatedResponse, setPaginationHeaders } from './PaginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  private accountService = inject(AccountService);
  memberCache = new Map();
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);
  userParams = signal<UserParams>(
    new UserParams(this.accountService.currentUser())
  );

  resetUserParams() {
    this.userParams.set(new UserParams(this.accountService.currentUser()));
  }

  getMembers() {
    const response = this.memberCache.get(
      Object.values(this.userParams()).join('-')
    );

    if (response) return setPaginatedResponse(response, this.paginatedResult);

    const params = setPaginationHeaders(this.userParams());

    return this.http
      .get<Member[]>(this.baseUrl + 'users', { observe: 'response', params })
      .subscribe({
        next: (response) => {
          setPaginatedResponse(response, this.paginatedResult);
          this.memberCache.set(
            Object.values(this.userParams()).join('-'),
            response
          );
        },
      });
  }

  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + `users/${id}`);
  }

  getMemberByUsername(username: string): Observable<Member> {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.body), [])
      .find((m: Member) => m.username === username);

    console.log(member);

    return this.http.get<Member>(this.baseUrl + `users/${username}`);
  }

  updateUserDetails(model: Member) {
    return this.http.put(this.baseUrl + 'users/edit-member', model).pipe();
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
