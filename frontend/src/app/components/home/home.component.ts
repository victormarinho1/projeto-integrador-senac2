import { DenunciasListComponent } from './../../denuncias/denuncias-list/denuncias-list.component';
import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { TokenModel } from '../../models/token';
import { CommonModule } from '@angular/common';
import { UsuariosListComponent } from '../../usuarios/usuarios-list/usuarios-list.component';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [DenunciasListComponent, CommonModule, UsuariosListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  private sharedService = inject(SharedService)
  mostrar = true
  userToken:TokenModel| null = null;
  
  ngOnInit(): void {
   this.userToken = this.sharedService.decodeToken();
  }
  
}
