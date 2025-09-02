import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Dashboard route
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((c) => c.DashboardComponent),
    canActivate: [authGuard],
  },

  // PTS20 Form routes
  {
    path: 'pts20',
    loadChildren: () => import('./features/pts20/pts20.routes').then((r) => r.pts20Routes),
    canActivate: [authGuard],
  },

  // PTS Risk routes
  {
    path: 'pts-risk',
    loadChildren: () => import('./features/pts-risk/pts-risk.routes').then((r) => r.ptsRiskRoutes),
    canActivate: [authGuard],
  },

  // Maintenance and Admin routes
  {
    path: 'maintenance',
    loadChildren: () =>
      import('./features/maintenance/maintenance.routes').then((r) => r.maintenanceRoutes),
    canActivate: [authGuard],
  },

  // Authentication routes (no guard needed)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((r) => r.authRoutes),
  },

  // Catch all route
  { path: '**', redirectTo: '/auth/login' },
];
