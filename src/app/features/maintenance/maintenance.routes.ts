import { Routes } from '@angular/router';

export const maintenanceRoutes: Routes = [
  {
    path: '',
    redirectTo: 'lookup-tables',
    pathMatch: 'full',
  },
  {
    path: 'lookup-tables',
    loadComponent: () =>
      import('./components/lookup-tables/lookup-tables.component').then(
        (c) => c.LookupTablesComponent
      ),
  },
];
