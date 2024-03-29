import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: String = 'http://xx.xx.xx.xx:8000/';

  noAuth = {
    headers: new HttpHeaders().set('no-auth', 'true')
  };

  constructor(public http: HttpClient, private errorHandling: ErrorHandlingService) {}

  login(endpoint: string, jsonData: any) {
    return this.http.post<any>(this.baseUrl + endpoint, jsonData, this.noAuth).pipe(retry(3), catchError(this.handleError));
  }

  postAuthData(endpoint: string, data: FormData) {
    return this.http.post<any>(this.baseUrl + endpoint, data).pipe(retry(3), catchError(this.errorHandling.handleError));
  }

  getAuthData(endpoint: string) {
    return this.http.get<any>(this.baseUrl + endpoint).pipe(retry(3), catchError(this.errorHandling.handleError));
  }

  deleteAuthData(ID: string) {
    return this.http.delete<any>(this.baseUrl + ID).pipe(retry(3), catchError(this.errorHandling.handleError));
  }

  putAuthData(ID: string, data: FormData) {
    return this.http.put<any>(this.baseUrl + ID, data).pipe(retry(3), catchError(this.errorHandling.handleError));
  }

  getUserofCertainType(endpoint: string) {
    return this.http.get<any>(this.baseUrl + endpoint).pipe(retry(3), catchError(this.errorHandling.handleError));
  }

  getImage(endpoint: string): Observable<Blob> {
    return this.http.get(this.baseUrl + endpoint, { responseType: 'blob' }).pipe(retry(3), catchError(this.errorHandling.handleError));
  }
}
