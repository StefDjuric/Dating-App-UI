import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../models/Pagination';
import { Message } from '../models/Message';
import { setPaginatedResponse } from './PaginationHelper';
import { UserParams } from '../models/UserParams';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.baseUrl;
  private http = inject(HttpClient);
  paginatedResult = signal<PaginatedResult<Message[]> | null>(null);

  getMessages(userParams: UserParams, container: string) {
    let params = new HttpParams();

    params = params.append('Container', container);

    return this.http
      .get<Message[]>(this.baseUrl + 'messages', {
        observe: 'response',
        params,
      })
      .subscribe({
        next: (response) =>
          setPaginatedResponse(response, this.paginatedResult),
      });
  }

  getMessagesFromThread(username: string): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${this.baseUrl}messages/get-thread/${username}`
    );
  }

  sendMessage(username: string, content: string) {
    return this.http.post<Message>(this.baseUrl + 'messages/send', {
      recipientUsername: username,
      content,
    });
  }

  deleteMessage(id: number) {
    return this.http.delete(`${this.baseUrl}messages/delete/${id}`);
  }
}
