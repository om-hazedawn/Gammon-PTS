import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <div class="header">
        <h1>PTS Dashboard</h1>
        @if (userInfo) {
        <div class="user-info">
          <span>Welcome, {{ userInfo.name || userInfo.username }}</span>
          <button mat-button (click)="logout()">
            <mat-icon>logout</mat-icon>
            Logout
          </button>
        </div>
        }
      </div>
      <p>Welcome to the Procurement Tender System</p>

      <div class="card-grid">
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>description</mat-icon>
            <mat-card-title>Form 20 (PTS20)</mat-card-title>
            <mat-card-subtitle>Tender Forms Management</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>
              Create and manage procurement tender forms with comprehensive workflow management.
            </p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/pts20/forms">View Forms</button>
            <button mat-button routerLink="/pts20/form/new">New Form</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>assessment</mat-icon>
            <mat-card-title>Risk Management</mat-card-title>
            <mat-card-subtitle>Tender Risk Assessment</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Assess and manage risks associated with tenders and procurement processes.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/pts-risk/tenders">
              View Risks
            </button>
            <button mat-button routerLink="/pts-risk/business-unit">Manage Units</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>settings</mat-icon>
            <mat-card-title>System Administration</mat-card-title>
            <mat-card-subtitle>Configuration & Maintenance</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Configure system settings, lookup tables, and perform maintenance tasks.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/maintenance/lookup-tables">
              Lookup Tables
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        padding: 20px;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .dashboard-card {
        height: 250px;
        display: flex;
        flex-direction: column;
      }

      .dashboard-card mat-card-content {
        flex: 1;
      }

      h1 {
        color: #1976d2;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  userInfo: any = null;

  ngOnInit() {
    this.loadUserInfo();
  }

  private async loadUserInfo() {
    try {
      this.userInfo = await this.authService.getUserInfo();
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}
