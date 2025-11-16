import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-usuarios-form',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule, MessageModule, FormsModule, Select,CommonModule],
  templateUrl: './usuarios-form.component.html',
  styleUrl: './usuarios-form.component.css'
})
export class UsuariosFormComponent {
  messageService = inject(MessageService);
  usuarioService = inject(UsuarioService);
  selectedFunction:any | undefined;
  formSubmitted = false;
  functions = [
    {name:'ADMIN'},
    {name:'CONSELHEIRO'}
  ]

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    sobrenome: new FormControl('', Validators.required),
    funcao: new FormControl('', Validators.required),            
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
      this.form.reset();
      this.formSubmitted = false;
    }
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
