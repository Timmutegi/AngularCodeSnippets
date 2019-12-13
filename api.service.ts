import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: String = 'http://xx.xx.xx.xx:8000/';
  token: String = localStorage.getItem('token');

  // header = new HttpHeaders({ Authorization: 'Token ' + this.token });

  noAuth = {
    headers: new HttpHeaders().set('no-auth', 'true')
  };

  constructor(public http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  login(endpoint: string, jsonData: any) {
    return this.http.post<any>(this.baseUrl + endpoint, jsonData, this.noAuth).pipe(retry(3), catchError(this.handleError));
  }

  postAuthData(endpoint: string, data: FormData) {
    return this.http.post<any>(this.baseUrl + endpoint, data).pipe(retry(3), catchError(this.handleError));
  }

  getAuthData(endpoint: string) {
    return this.http.get<any>(this.baseUrl + endpoint).pipe(retry(3), catchError(this.handleError));
  }

  deleteAuthData(ID: string) {
    return this.http.delete<any>(this.baseUrl + ID).pipe(retry(3), catchError(this.handleError));
  }

  putAuthData(ID: string, data: FormData) {
    return this.http.put<any>(this.baseUrl + ID, data).pipe(retry(3), catchError(this.handleError));
  }

  getUserofCertainType(endpoint: string) {
    return this.http.get<any>(this.baseUrl + endpoint).pipe(retry(3), catchError(this.handleError));
  }

  getImage(endpoint: string): Observable<Blob> {
    return this.http.get(this.baseUrl + endpoint, { responseType: 'blob' }).pipe(retry(3), catchError(this.handleError));
  }
}
