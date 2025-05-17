import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: ' ', pathMatch: 'full', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
];
