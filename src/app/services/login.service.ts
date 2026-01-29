import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../api.config';
import { tap, catchError, throwError } from 'rxjs';
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = `${API_URL}/api/auth`;
  private tokenKey = 'wolf_token';
  currentUser = signal<User | null>(null);

  constructor() {
    this.loadUserFromToken();
  }

  login(credentials: any) {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => this.handleAuthSuccess(response)),
        catchError((error) => {
          return throwError(() => new Error(error.error?.message || 'שגיאה בהתחברות. ודא שהפרטים נכונים ונסה שוב.'));
        })
      );
  }

  register(userInfo: any) {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/register`, userInfo)
      .pipe(
        tap((response) => this.handleAuthSuccess(response)),
        catchError((error) => {
          return throwError(() => new Error(error.error?.message || 'שגיאה בהרשמה. ייתכן שהמשתמש כבר קיים.'));
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private loadUserFromToken() {
    const token = this.getToken();
    if (token) {
      try {
        const decodedUser: User = jwtDecode(token);
        this.currentUser.set(decodedUser);
      } catch (error) {
        this.logout();
      }
    }
  }

  private handleAuthSuccess(LoginResponse: LoginResponse) {
    localStorage.setItem(this.tokenKey, LoginResponse.token);
    this.currentUser.set(LoginResponse.user);
    this.router.navigate(['/teams']);
  }
}
