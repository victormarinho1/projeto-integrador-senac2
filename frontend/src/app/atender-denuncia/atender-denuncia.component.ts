import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
// Importe seu serviço de denúncias
// import { DenunciaService } from 'src/app/services/denuncia.service';

// --- Imports (se for standalone) ---
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { DenunciaService } from '../services/denuncia/denuncia.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-atender-denuncia',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    GalleriaModule,
    SelectButtonModule,
    TagModule,
    MessageModule,
    RouterLink,
    DialogModule,
    FormsModule
],
  templateUrl: './atender-denuncia.component.html',
})
export class AtenderDenunciaComponent implements OnInit {
  prioridadeSelecionada1 = 'MEDIA';
  denuncia: any; // Armazena os dados da denúncia
  prioridadeOptions: any[];
  equipeEnviada = false
  isLoading = true;
  denunciaService = inject(DenunciaService);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
 modalVisivel: boolean = false;
 modalVisivel2: boolean = false;
  atendimentoForm = new FormGroup({
    procedimentos: new FormControl('', [Validators.required]),
    prioridade: new FormControl('')
  });

  // Imagens de exemplo para a galeria (substitua pelo seu array de imagens)
  images: any[] = [
    {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg',
      alt: 'Imagem 1',
    },
    {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/demo/product/blue-band.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/demo/product/blue-band.jpg',
      alt: 'Imagem 2',
    },
  ];

  constructor(
    private route: ActivatedRoute,
  ) {
    this.prioridadeOptions = [
      { label: 'Baixa', value: 'BAIXA'},
      { label: 'Média', value: 'MEDIA'},
      { label: 'Alta', value: 'ALTA' },
    ];


  }

  fecharModal2() {
    this.modalVisivel2 = false;
    this.router.navigate(['/home'])
  }

   fecharModal() {
    this.modalVisivel = false;
  }

  onSubmit() {
  if (this.atendimentoForm.invalid) {
    this.atendimentoForm.markAllAsTouched();
    return;
  }

  this.finalizarDenuncia();
  this.modalVisivel2 = true
}




  ngOnInit(): void {
    // 1. Pega o 'id' da URL
    const protocolo:string | null = this.route.snapshot.paramMap.get('id');
    if(protocolo){
      this.denunciaService.buscarDenunciaPorProtocolo(protocolo).subscribe(data => {
        this.denuncia = data;
        this.images = data.imagens;
        this.prioridadeSelecionada1 = data.prioridade
        this.atendimentoForm.patchValue({
    procedimentos: this.denuncia.devolutiva,
    prioridade:this.denuncia.prioridade
  });
        this.equipeEnviada = this.denuncia.equipe_enviada;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    }
  }


  enviarEquipe() {
    this.denunciaService.enviarEquipe(this.denuncia.id).subscribe(d =>{
      this.modalVisivel = true;
      this.denuncia.equipe_enviada = true;
      this.cdr.detectChanges();
    })


  }

  prioridadeSelecionada(event: any) {
    console.log(event)
    const prioridadeSelecionada = event.value;
    const protocolo:string | null = this.route.snapshot.paramMap.get('id');
    this.denunciaService.definirPrioridade(protocolo ,prioridadeSelecionada).subscribe(d =>{
    this.atendimentoForm.patchValue({
    prioridade: prioridadeSelecionada
  });
      this.cdr.detectChanges();
    })
    this.denunciaService.atenderDenuncia(this.denuncia.id).subscribe();

  }

 // CÓDIGO CORRIGIDO
getSeverity(
  status: string
): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | null | undefined { // <-- A MUDANÇA ESTÁ AQUI
  if (status === 'NOVA') return 'success';
  if (status === 'EM_ANDAMENTO') return 'warn';
  if (status === 'CONCLUIDA') return 'secondary';
  return 'secondary';
}

  finalizarDenuncia() {
    this.denunciaService.finalizarAtendimento(this.denuncia.id, this.atendimentoForm.get('procedimentos')?.value).subscribe();
    this.modalVisivel2 = true;
  }
}
