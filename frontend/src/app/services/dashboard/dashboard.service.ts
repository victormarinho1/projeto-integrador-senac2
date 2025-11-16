import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface StatusData {
  total_novas: number;
  total_em_andamento: number;
  total_concluidas: number;
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
 
  
  showTotalStatus():Observable<StatusData>{
    return this.http.get<StatusData>(`${this.apiUrl}/dashboard/total-status`);
  }

  showDenunciasAtendidas():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/dashboard/denuncias-atendidas`);
  }
}
