import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-usuarios-list',
  imports: [TableModule, ToggleSwitchModule, FormsModule],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent implements OnInit {
  private userService = inject(UsuarioService);
  private cdr = inject(ChangeDetectorRef);

  changeStatus(id:number) {
    let t = this.userService.changeStatus(id).subscribe(data =>{

    });

    console.log(t)
  }
  usuarios: any[] = [];
  private usuariosService = inject(UsuarioService)

  ngOnInit(): void {
    this.usuariosService.findAll().subscribe(data => {
      this.usuarios = data
       this.cdr.detectChanges();
      console.log(data)
    });
  }

}
