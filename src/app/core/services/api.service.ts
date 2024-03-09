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
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/user/${id}`, data);
  }
  // ROLE
  getAllRole(): Observable<any> {
    return this.http.get(`${this.api}/master/user-role`);
  }
  // REPORTS
  getAllReportByUserId(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/reportByUserId/${id}`);
  }
  addReport(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/report`, data);
  }

  // IMG
  getFile(filename: string): Observable<any> {
    return this.http.get(`${this.api}/file/${filename}`);
  }
  uploadFile(formData: any): Observable<any> {
    return this.http.post(`${this.api}/upload`, formData);
  }
}
