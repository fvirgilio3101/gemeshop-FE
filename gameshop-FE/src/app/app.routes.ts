import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'videogames',
    loadComponent: () =>
      import('./videogame/videogame.component').then(
        (m) => m.VideogameComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigi alla pagina di login di default
  { path: '**', redirectTo: 'login' }, // Redirigi alle pagine di login se la rotta non esiste
];
