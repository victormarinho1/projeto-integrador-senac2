import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor(private messageService: MessageService) {}

  showPassword = false;


  isMobile:any = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  });

 onSubmit() {
  const email = this.loginForm.get('email')?.value ?? '';
  const senha = this.loginForm.get('senha')?.value ?? '';

  this.authService.login(email, senha).subscribe({
    next: user => {
      console.log('Usuário logado:', user);
      this.router.navigate(['/home']);
    },
    error: err => {
      console.error('Erro no login:', err);

      let errorMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';

      if (err.status === 0) {
        // Servidor não respondeu (problema de rede, CORS ou servidor offline)
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.';
      } else if (err.status === 401) {
        // Credenciais inválidas
        errorMessage = 'Email ou senha incorretos.';
      } else if (err.error?.message) {
        // Mensagem personalizada do backend
        errorMessage = err.error.message;
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Erro de login',
        detail: errorMessage,
        life: 3000
      });
    }
  });
}


  togglePassword() {
  this.showPassword = !this.showPassword;
}
}
