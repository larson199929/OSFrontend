import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotasComponent } from "./mascotas/pages/mascotas/mascotas.component";
import { RegistrosComponent } from "./registros/page/registros/registros.component";
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'mascotas', component: MascotasComponent },
  { path: 'registros', component: RegistrosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
