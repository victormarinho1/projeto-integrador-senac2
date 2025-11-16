import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { TokenModel } from '../../models/token';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private cookieService = inject(CookieService);

  decodeToken(): TokenModel | null {    
      const token = this.cookieService.get('authToken'); 
      if (!token) return null;
      return jwtDecode<TokenModel>(token);
    
  }
}
