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
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.api}/master/users`);
  }
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/user/${id}`, data);
  }
  // ROLE
  getAllRole(): Observable<any> {
    return this.http.get(`${this.api}/master/user-role`);
  }
  // REPORTS
  getAllReport(): Observable<any> {
    return this.http.get(`${this.api}/master/reports`);
  }
  getAllReportByUserId(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/reportByUserId/${id}`);
  }
  getAllAkumulasiReport(
    id: number,
    month: number,
    year: number
  ): Observable<any> {
    return this.http.get(
      `${this.api}/master/akumulasi-report/${id}/${month}/${year}`
    );
  }
  addReport(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/report`, data);
  }
  updateReport(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/report/${id}`, data);
  }
  getTotalReportByUser(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/total-reports/${id}`);
  }

  // ABSENSI
  getAllAbsensiByUserId(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/absensi-by-user/${id}`);
  }
  addAbsensi(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/absensi`, data);
  }
  updateAbsensi(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/absensi/${id}`, data);
  }
  getTotalAbsenByUser(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/total-absensi/${id}`);
  }
  // IMG
  getFile(filename: string): Observable<any> {
    return this.http.get(`${this.api}/file/${filename}`);
  }
  uploadFile(formData: any): Observable<any> {
    return this.http.post(`${this.api}/upload`, formData);
  }
  deleteFile(filename: string): Observable<any> {
    return this.http.delete(`${this.api}/delete/${filename}`);
  }
}
