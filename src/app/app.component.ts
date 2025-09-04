import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <button mat-icon-button (click)="toggleSidenav()" *ngIf="isAuthenticated">
          <mat-icon>menu</mat-icon>
        </button>
        <span>PTS - Procurement Tender System</span>
        <span class="spacer"></span>
        <span *ngIf="isAuthenticated">{{ userDisplayName }}</span>
        <button mat-icon-button *ngIf="isAuthenticated" (click)="logout()">
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar-row>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" [opened]="sidenavOpened" *ngIf="isAuthenticated">
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>

          <mat-divider></mat-divider>

          <div mat-subheader>Form 20 (PTS20)</div>
          <a mat-list-item routerLink="/pts20/forms">
            <mat-icon matListItemIcon>description</mat-icon>
            <span matListItemTitle>Form List</span>
          </a>
          <a mat-list-item routerLink="/pts20/form/new">
            <mat-icon matListItemIcon>add</mat-icon>
            <span matListItemTitle>New Form</span>
          </a>

          <mat-divider></mat-divider>

          <div mat-subheader>Risk Management</div>
          <a mat-list-item routerLink="/pts-risk/tenders">
            <mat-icon matListItemIcon>assessment</mat-icon>
            <span matListItemTitle>Tender Risk</span>
          </a>
          <a mat-list-item routerLink="/pts-risk/gammon-entity">
            <mat-icon matListItemIcon>account_circle</mat-icon>
            <span matListItemTitle>Gammon Entity</span>
          </a>
          <a mat-list-item routerLink="/pts-risk/business-unit">
            <mat-icon matListItemIcon>business</mat-icon>
            <span matListItemTitle>Business Units</span>
          </a>
          <a mat-list-item routerLink="/pts-risk/currency">
            <mat-icon matListItemIcon>attach_money</mat-icon>
            <span matListItemTitle>Currency</span>
          </a>
          <a mat-list-item routerLink="/pts-risk/priority-level">
            <mat-icon matListItemIcon>arrow_upward</mat-icon>
            <span matListItemTitle>Priority Level</span>
          </a>
          <a mat-list-item routerLink="/pts-risk/risk-assessment-criteria">
            <mat-icon matListItemIcon>bar_chart</mat-icon>
            <span matListItemTitle>Risk Assessment Criteria</span>
          </a>
          <a mat-list-item routerLink="/pts-risk/system-config">
            <mat-icon matListItemIcon>build</mat-icon>
            <span matListItemTitle>System Config</span>
          </a>
          <a mat-list-item routerLink="/pts-risk/market-sector">
            <mat-icon matListItemIcon>trending_up</mat-icon>
            <span matListItemTitle>Market Sector</span>
          </a>

          <mat-divider></mat-divider>

          <div mat-subheader>Administration</div>
          <a mat-list-item routerLink="/maintenance/lookup-tables">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Lookup Tables</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .sidenav-container {
        height: calc(100vh - 64px);
      }

      .spacer {
        flex: 1 1 auto;
      }

      .main-content {
        padding: 0;
        height: 100%;
        overflow: auto;
      }

      mat-sidenav {
        width: 250px;
      }

      .mat-toolbar-row {
        height: 64px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'PTS - Procurement Tender System';
  sidenavOpened = true;

  constructor(private authService: AuthService) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get userDisplayName(): string {
    return this.authService.getUserDisplayName();
  }

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
