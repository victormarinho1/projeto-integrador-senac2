import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environments';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
    private router = inject(Router)
  private apiUrl = environment.apiUrl;

  register(user: any) {
    this.http.post(`${this.apiUrl}/usuarios`, user).subscribe(r => {
      console.log(r);
    });
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, senha })
      .pipe(
        tap(response => {
          this.cookieService.set('authToken', response.token, {
            path: '/',
            secure: true,
            sameSite: 'Lax'
          });
        })
      );
  }

  getToken(): string {
    return this.cookieService.get('authToken');
  }

  logout() {
    this.cookieService.delete('authToken', '/');
    this.router.navigate(['/']);
  }
}
