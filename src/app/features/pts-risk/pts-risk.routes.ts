import { Routes } from '@angular/router';

export const ptsRiskRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tenders',
    pathMatch: 'full',
  },
  {
    path: 'tenders',
    loadComponent: () =>
      import('./components/tender-list/tender-list.component').then((c) => c.TenderListComponent),
  },
  {
    path: 'business-unit',
    loadComponent: () =>
      import('./components/business-unit-list/business-unit-list.component').then(
        (c) => c.BusinessUnitListComponent
      ),
  },
  {
    path: 'currency',
    loadComponent: () =>
      import('./components/currency-list/currency-list.component').then(
        (c) => c.CurrencyListComponent
      ),
  },
  {
    path: 'market-sector',
    loadComponent: () =>
      import('./components/market-sector-list/market-sector-list.component').then(
        (c) => c.MarketSectorListComponent
      ),
  },
  {
    path: 'priority-level',
    loadComponent: () =>
      import('./components/priority-level-list/priority-level-list.component').then(
        (c) => c.PriorityLevelListComponent
      ),
  },
  {
    path: 'risk-assessment-criteria',
    loadComponent: () =>
      import(
        './components/risk-assessment-criteria-list/risk-assessment-criteria-list.component'
      ).then((c) => c.RiskAssessmentCriteriaListComponent),
  },
  {
    path: 'system-config',
    loadComponent: () =>
      import('./components/system-config-list/system-config-list.component').then(
        (c) => c.SystemConfigListComponent
      ),
  },
  {
    path: 'gammon-entity',
    loadComponent: () =>
      import('./components/gammon-entity-list/gammon-entity-list.component').then(
        (c) => c.GammonEntityListComponent
      ),
  },
];
