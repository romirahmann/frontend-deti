import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // USERS

  // ROLE
  getAllRole(): Observable<any> {
    return this.http.get(`${this.api}/master/user-role`);
  }
}
