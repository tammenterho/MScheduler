import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  getCampaignsService(userId: string) {
    // console.log('getting users');
    return this.http.get<any>(`${apiUrls.usersServiceApi}`, {
      withCredentials: true,
    });
  }
}
