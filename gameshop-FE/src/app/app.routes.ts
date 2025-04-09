import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'videogames',
    loadComponent: () => import('./videogame/videogame.component').then(m => m.VideogameComponent)
  },
  { path: '', redirectTo: 'videogames', pathMatch: 'full' },
  { path: '**', redirectTo: 'videogames' }
];
