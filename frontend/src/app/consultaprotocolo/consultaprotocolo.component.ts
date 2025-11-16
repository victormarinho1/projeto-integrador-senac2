import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// Importe os módulos necessários se o componente for STANDALONE
// (Se não for, importe no app.module.ts)
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// REMOVEMOS InputMaskModule e adicionamos InputTextModule
import { InputTextModule } from 'primeng/inputtext';
import { DenunciaService } from '../services/denuncia/denuncia.service';
import { setInterval } from 'timers';

@Component({
  selector: 'app-consulta-protocolo',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TimelineModule,
    CardModule,
    MessageModule,
    ProgressSpinnerModule,
    InputTextModule, // <-- ADICIONADO
  ],
  templateUrl: './consultaprotocolo.component.html',
})
export class ConsultaProtocoloComponent {
  denunciaService = inject(DenunciaService);
    private cdr = inject(ChangeDetectorRef);

  consultaForm = new FormGroup({
    protocolo: new FormControl('', [Validators.required]),
  });
  statusAtual = 'Denúncia Recebida';
  isLoading = false;
  errorMessage: string | null = null;
  denuncia: any = null;
  denuncia2: any = null;
  submitted = false; // Para controlar quando exibir erros de validação

  // Regex para validar o formato: DEN-14digitos-8alfanumericos
  protocolRegex = /^DEN-\d{14}-[A-Z0-9]{8}$/;

  // Getter para facilitar o acesso ao controle no HTML
  get f() {
    return this.consultaForm.controls;
  }

  onSubmit() {
    if (this.consultaForm.invalid) {
      return; // Para se o formulário for inválido
    }

    this.isLoading = true;
    this.errorMessage = null;

    const protocolo = this.consultaForm.value.protocolo?.toUpperCase(); // Converte para maiúsculo

    this.denunciaService.buscarDenunciaPorProtocolo(protocolo).subscribe((d) => {
      this.denuncia2 = d;

      this.isLoading = false;

      this.submitted = true; // Marca que o form foi submetido
      this.cdr.detectChanges()
    // SIMULAÇÃO DE SUCESSO (usando seu exemplo)
    this.denuncia = {
      protocolo: this.denuncia2.protocolo, // <-- ATUALIZADO
      statusAtual: this.statusAtual,
      historico: [
        {
          status: 'Denúncia Recebida',
          descricao: 'A denúncia foi registrada em nosso sistema.',
          icon: 'pi pi-check',
          color: '#60a5fa', // blue-400
        }
      ],
    };
console.log(this.denuncia2)
    if (this.denuncia2.prioridade != 'SEM_ANALIZE') {
      this.denuncia.historico.push({
        status: 'Análise Preliminar',
        descricao:
          'A denúncia foi analisada e classificada como "Prioridade ' +
          this.denuncia2.prioridade +
          '".',
        icon: 'pi pi-eye',
        color: '#fbbf24', // amber-400
      });
      this.statusAtual =  'Análise Preliminar';

    }

    if(this.denuncia2.equipe_enviada){
      this.denuncia.historico.push(// Este evento ainda não teria acontecido, mas mantendo para o exemplo
        {
          status: 'Em Verificação de Campo',
          descricao: 'Uma equipe foi encaminhada ao local para apuração.',
          icon: 'pi pi-users',
          color: '#f97316', // orange-500
        });
    this.statusAtual =  'Em Verificação de Campo';

    }

    if(this.denuncia2.status == 'CONCLUIDA'){
      this.denuncia.historico.push({
        status: 'Em Apuração Completa',
          descricao:
            'A equipe visitou o local e obteve as seguintes informações: ' +
            this.denuncia2.devolutiva,

          icon: 'pi pi-trophy',
          color: '#d3d3d3',
      });

    this.statusAtual = 'Em Apuração Completa';

  }
      this.cdr.detectChanges()

setTimeout(()=>{
this.onSubmit()
},5000)

    });

  }

  resetConsulta() {
    this.denuncia = null;
    this.errorMessage = null;
    this.submitted = false;
    this.consultaForm.reset();
  }
}
