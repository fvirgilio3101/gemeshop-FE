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
  path: 'videogame/:id',
  loadComponent: () =>
    import('./videogame-detail/videogame-detail.component').then(
      (m) => m.VideogameDetailComponent
    ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'user-detail',
    loadComponent: () => import('./user-detail/user-detail.component').then(m => m.UserDetailComponent)
  },
  { path: '', redirectTo: 'videogames', pathMatch: 'full' }, // Redirigi alla pagina di login di default
  /*{ path: '**', redirectTo: 'videogames' },  Redirigi alle pagine di login se la rotta non esiste*/

];
