import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  baseUrl = 'https://localhost:7204/api/';

  login(model: any) {
    this.http.post(this.baseUrl + 'accountmanager/login', model);
  }
}
