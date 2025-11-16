import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Pode deixar o ngOnInit vazio ou usar para inicializações, mas sem erros
  }

  // Função para capturar o arquivo selecionado
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Função para enviar o arquivo
  onUpload(): void {
    if (!this.selectedFile) {
      alert("Por favor, selecione um arquivo.");
      return;
    }

    const formData = new FormData();
    formData.append('files', this.selectedFile, this.selectedFile.name);

    // Enviar o arquivo para a API
    this.http.post(`http://localhost:8080/api/denuncias/image`, formData).subscribe({
      next: (response) => {
        console.log('Arquivo enviado com sucesso!', response);
      },
      error: (err) => {
        console.error('Erro ao enviar o arquivo', err);
      }
    });
  }
}
