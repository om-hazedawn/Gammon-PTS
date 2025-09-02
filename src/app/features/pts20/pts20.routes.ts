import { Routes } from '@angular/router';

export const pts20Routes: Routes = [
  {
    path: '',
    redirectTo: 'forms',
    pathMatch: 'full',
  },
  {
    path: 'forms',
    loadComponent: () =>
      import('./components/form-list/form-list.component').then((c) => c.FormListComponent),
  },
  {
    path: 'form/new',
    loadComponent: () =>
      import('./components/form-detail/form-detail.component').then((c) => c.FormDetailComponent),
  },
  {
    path: 'form/:id',
    loadComponent: () =>
      import('./components/form-detail/form-detail.component').then((c) => c.FormDetailComponent),
  },
];
