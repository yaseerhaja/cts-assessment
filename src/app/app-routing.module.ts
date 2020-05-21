import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { AuthService } from './auth/auth.service';
import { ImportFileComponent } from './components/import-file/import-file.component';
import { TechComponent } from './components/tech/tech.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthService],
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'import',
    canActivate: [AuthService],
    component: ImportFileComponent,
  },
  {
    path: 'tech',
    canActivate: [AuthService],
    component: TechComponent,
  },
  { path: '', redirectTo: '/tech', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
