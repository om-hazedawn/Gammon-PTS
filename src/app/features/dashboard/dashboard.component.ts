import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Form20ListService, Form20List } from '../../core/services/Form20/form20list.service';

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
      <p>Welcome to the Preliminary Tender Summary</p>

      <div class="card-grid">
        <mat-card class="dashboard-card main-card">
          <mat-card-header>
            <div mat-card-avatar class="card-avatar">
              <mat-icon class="large-icon">description</mat-icon>
            </div>
            <mat-card-title>Preliminary Tender Summary</mat-card-title>
            <mat-card-subtitle>PCS/01 Form 020 (Gate 3)- Target jobs and linking decision to bid to the business plan and Divisional Resource plan</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>
             Estimating Team prepare a preliminary tender summary (PCS/01 Form 020) as soon as possible after receipt of tender documents.
            </p>
            
            <!-- Status List -->
            <div class="status-list">
              <div class="status-item">
                <span class="status-label">Draft/Rejected</span>
                <div class="status-count-container">
                  <div class="status-circle">{{ statusCounts.draft }}</div>
                </div>
              </div>
              <div class="status-item">
                <span class="status-label">Submitted</span>
                <div class="status-count-container">
                  <div class="status-circle">{{ statusCounts.submitted }}</div>
                </div>
              </div>
              <div class="status-item">
                <span class="status-label">Endorsed by HOE</span>
                <div class="status-count-container">
                  <div class="status-circle">{{ statusCounts.endorsedHOE }}</div>
                </div>
              </div>
              <div class="status-item">
                <span class="status-label">Endorsed By CM</span>
                <div class="status-count-container">
                  <div class="status-circle">{{ statusCounts.endorsedCM }}</div>
                </div>
              </div>
              <div class="status-item">
                <span class="status-label">Endorsed by Director</span>
                <div class="status-count-container">
                  <div class="status-circle">{{ statusCounts.endorsedDirector }}</div>
                </div>
              </div>
              <div class="status-item">
                <span class="status-label">Approved by Executive Director</span>
                <div class="status-count-container">
                  <div class="status-circle">{{ statusCounts.approvedED }}</div>
                </div>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/pts20/forms">
              <mat-icon>list</mat-icon>
              Form 20 List (Gate 3)
            </button>
            <button mat-button routerLink="/pts20/form/new">
              <mat-icon>add_circle</mat-icon>
              New Form
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <div mat-card-avatar class="card-avatar">
              <mat-icon class="large-icon">assessment</mat-icon>
            </div>
            <mat-card-title>Tender Risk Assessment</mat-card-title>
            <mat-card-subtitle>PCS/01 Risk Assessment - To Excom for the Bid / No-Bid discussion</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
           
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/pts-risk/tenders">
              <mat-icon>list_alt</mat-icon>
              Risks Assessment List
            </button>
            <button mat-button routerLink="/pts-risk/business-unit">
              <mat-icon>business</mat-icon>
              Manage Units
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <div mat-card-avatar class="card-avatar">
              <mat-icon class="large-icon">settings</mat-icon>
            </div>
            <mat-card-title>System Administration</mat-card-title>
            <mat-card-subtitle>Configuration & Maintenance</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Configure system settings, lookup tables, and perform maintenance tasks to keep the system running smoothly.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/maintenance/lookup-tables">
              <mat-icon>table_chart</mat-icon>
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
        padding: 24px;
        width: 100%;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
        padding-bottom: 16px;
        border-bottom: 1px solid #e0e0e0;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 16px;
        font-size: 14px;
        color: #666;
      }

      .user-info button {
        min-width: auto;
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 24px;
        margin-top: 24px;
      }

      .dashboard-card {
        min-height: 280px;
        display: flex;
        flex-direction: column;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        border-radius: 12px;
        overflow: hidden;
      }

      .dashboard-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }

      .dashboard-card mat-card-header {
        padding-bottom: 16px;
      }

      .dashboard-card mat-card-title {
        font-size: 18px;
        font-weight: 600;
        color: #1976d2;
        margin-bottom: 8px;
      }

      .dashboard-card mat-card-subtitle {
        font-size: 13px;
        line-height: 1.4;
        color: #666;
      }

      .dashboard-card mat-card-content {
        flex: 1;
        padding-top: 8px;
      }

      .main-card {
        min-height: 400px !important;
      }

      .status-list {
        margin-top: 16px;
        margin-bottom: 8px;
      }

      .status-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        margin-bottom: 8px;
        background: #f8f9fa;
        border-radius: 6px;
        border-left: 4px solid #e0e0e0;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
      }

      .status-item:hover {
        background: #f0f1f3;
        transform: translateX(4px);
      }

      .status-item:last-child {
        margin-bottom: 0;
      }

      .status-count-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 40px;
      }

      .status-circle {
        width: 32px;
        height: 32px;
        background-color: #1976d2;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 700;
      }

      .status-label {
        font-size: 14px;
        font-weight: 500;
        flex: 1;
        color: #333;
      }

      .dashboard-card mat-card-content p {
        font-size: 14px;
        line-height: 1.5;
        color: #555;
        margin: 0;
      }

      .dashboard-card mat-card-actions {
        padding: 16px;
        gap: 12px;
        border-top: 1px solid #f0f0f0;
        background-color: #fafafa;
      }

      .card-avatar {
        width: 48px !important;
        height: 48px !important;
        border-radius: 50%;
        background: linear-gradient(135deg, #1976d2, #42a5f5);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
      }

      .large-icon {
        font-size: 28px !important;
        width: 28px !important;
        height: 28px !important;
        color: white !important;
      }

      .dashboard-card button {
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 8px;
        text-transform: none;
        font-weight: 500;
      }

      .dashboard-card button mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      h1 {
        color: #1976d2;
        margin: 0;
        font-size: 28px;
        font-weight: 600;
      }

      .dashboard-container > p {
        color: #666;
        font-size: 16px;
        margin: 0;
        text-align: center;
        font-style: italic;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .dashboard-container {
          padding: 16px;
        }
        
        .header {
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }
        
        .card-grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }
        
        h1 {
          font-size: 24px;
        }
      }
    `,
  ],
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private form20ListService = inject(Form20ListService);

  userInfo: any = null;

  // Status counts for Preliminary Tender Summary
  statusCounts = {
    draft: 0,
    submitted: 0,
    endorsedHOE: 0,
    endorsedCM: 0,
    endorsedDirector: 0,
    approvedED: 0
  };

  ngOnInit() {
    this.loadUserInfo();
    this.loadStatusCounts();
  }

  private loadStatusCounts(): void {
    this.form20ListService.getPagedForm20List({ 
      filteringItem: {}, 
      pageSize: -1, 
      page: 0 
    }).subscribe({
      next: (response) => {
        this.calculateStatusCounts(response.items);
      },
      error: (error) => {
        console.error('Error loading status counts:', error);
        // Keep default counts (0) on error
      }
    });
  }

  private calculateStatusCounts(forms: Form20List[]): void {
    // Reset counts
    this.statusCounts = {
      draft: 0,
      submitted: 0,
      endorsedHOE: 0,
      endorsedCM: 0,
      endorsedDirector: 0,
      approvedED: 0
    };

    // Count each status
    forms.forEach(form => {
      switch (form.status) {
        case 'DRAFT':
        case 'REJECTED':
          this.statusCounts.draft++;
          break;
        case 'SUBMITTED':
          this.statusCounts.submitted++;
          break;
        case 'HOE_ENDORSED':
          this.statusCounts.endorsedHOE++;
          break;
        case 'CM_ENDORSED':
          this.statusCounts.endorsedCM++;
          break;
        case 'DIR_ENDORSED':
          this.statusCounts.endorsedDirector++;
          break;
        case 'ED_APPROVED':
          this.statusCounts.approvedED++;
          break;
      }
    });
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
