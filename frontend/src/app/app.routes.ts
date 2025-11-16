import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { HomeComponent } from './components/home/home.component';
import { DenunciasListComponent } from './denuncias/denuncias-list/denuncias-list.component';
import { TesteComponent } from './components/teste/teste.component';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { EducacaoComponent } from './educacao/educacao/educacao.component';
import { ConsultaProtocoloComponent } from './consultaprotocolo/consultaprotocolo.component';
import { AtenderDenunciaComponent } from './atender-denuncia/atender-denuncia.component';

export const routes: Routes = [
    {path:"", component:LoginComponent},
    {path:"register", component:RegisterComponent},
    {path:"cadastro-denuncia", component:DenunciasComponent},
    {path:"lista-denuncias", component:DenunciasListComponent},
    {path:"lista-usuarios", component:UsuariosListComponent},
    {path:"home", component:HomeComponent},
    {path:"admin", component:HomeComponent},
    {path:"teste", component:TesteComponent},
    {path:"usuario-form", component:UsuariosFormComponent},
    {path:"dashboard", component:DashboardComponent},
    { path: 'educacao', component: EducacaoComponent },
    { path: 'consultar-protocolo', component: ConsultaProtocoloComponent },
{
    path: 'atender-denuncia/:id',
    component: AtenderDenunciaComponent,
  },

];
