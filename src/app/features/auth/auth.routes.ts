import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'callback',
    loadComponent: () =>
      import('./components/auth-callback/auth-callback.component').then(
        (c) => c.AuthCallbackComponent
      ),
  },
];
