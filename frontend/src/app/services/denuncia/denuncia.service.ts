import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;



  create(denuncia: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/denuncias`, denuncia,{
      observe: 'response'
    });
  }

 findAll(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/denuncias`);
}

  atenderDenuncia(id:number){
    return this.http.patch(`${this.apiUrl}/denuncias/${id}/atender`,{});
  }

  buscarDenunciaPorProtocolo(protocolo:string|null|undefined){
  return this.http.get<any>(`${this.apiUrl}/denuncias/protocolo/${protocolo}`);
  }


uploadImage(files: File[] | File | null | undefined) {
  if (!files) {
    console.log('Nenhum arquivo foi selecionado.');
    return;
  }

  const formData = new FormData();

  // Se for um único arquivo, transformamos em array para usar o forEach
  const fileArray = Array.isArray(files) ? files : [files];

  fileArray.forEach(file => {
    console.log(files)
    formData.append('files', file, file.name);
  });

  return this.http.post(`${this.apiUrl}/denuncias/image`, formData);
}



definirPrioridade(protocolo: string | null, prioridade: string) {
  return this.http.patch(`${this.apiUrl}/denuncias/${protocolo}/prioridade`, { prioridade });
}

enviarEquipe( id: string) {
  return this.http.get(`${this.apiUrl}/denuncias/${id}/enviar-equipe`,);
}


finalizarAtendimento(id: number, devolutiva:string | null | undefined){
  return this.http.patch(`${this.apiUrl}/denuncias/${id}/finalizar-atendimento`, { devolutiva });

}
}
