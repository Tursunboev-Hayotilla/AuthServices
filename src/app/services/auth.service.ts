import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Login } from '../interfaces/login';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Register } from '../interfaces/register';
import { LoginResponse } from '../interfaces/responce';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  apiUrl = environment.apiUrl;
  tokenKey: string = 'token';

  login(data: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}Users/Login`, data).pipe(
      map((response: LoginResponse) => {
        if (response.isSuccess) {
          localStorage.setItem(this.tokenKey, response.token);
          this.router.navigate(['/register']);
        }
        return response;
      })
    );
  }

  register(data: Register): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}Users/Register`, data).pipe(
      map((response: string) => {
        if (response === 'Qilichdek Qilichbek') {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/register']);
        }
        return response;
      })
    );
  }
}
