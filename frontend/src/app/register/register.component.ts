import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  
  registerForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    sobrenome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
    confirmarSenha: new FormControl('',[Validators.required]) 
  });

     
  onSubmit(){
    console.log(this.registerForm)
    if (this.registerForm.value.senha !== this.registerForm.value.confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
      }
      this.register(this.registerForm.value)
  }

  register(user:any){
    this.authService.register(user)
  }
}
