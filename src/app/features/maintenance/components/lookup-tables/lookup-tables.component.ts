import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LookupTableDialogComponent } from './lookup-table-dialog.component';
import { SetTenderNoComponent } from '../set-tender-no/set-tender-no.component';
import { MigrationComponent } from '../migration/migration.component';
import { TenderNoRunningNoComponent } from '../Tender-no-running-no/tender-no-running-no.component';
import { CancelApprovalComponent } from '../cancle-aaproval/cancel-approval.component';
import { TenderValueRemarkComponent } from '../Tender-value-remark/tender-value-remark.component';

@Component({
  selector: 'app-lookup-tables',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatGridListModule, MatIconModule],
  template: `
    <div class="container">
      <div class="page-header">
        <h1>Maintenance Management</h1>
        <p>Configure and maintain lookup tables and system settings</p>
      </div>

      <mat-card class="section-card">
        <div class="section-header">
          <mat-icon class="section-icon">list</mat-icon>
          <h3>Lookup Table Maintenance</h3>
        </div>
        <p class="section-description">Manage and update system lookup tables</p>
        <mat-grid-list cols="4" rowHeight="85px" gutterSize="16px" class="button-grid">
          <mat-grid-tile><button mat-raised-button class="maintenance-button lookup-button" (click)="update('bidType','Bid Type')"><span>Bid Type</span></button></mat-grid-tile>
          <mat-grid-tile><button mat-raised-button class="maintenance-button lookup-button" (click)="update('contractType','Contract Type')"><span>Contract Type</span></button></mat-grid-tile>
          <mat-grid-tile><button mat-raised-button class="maintenance-button lookup-button" (click)="update('currency','Currency')"><span>Currency</span></button></mat-grid-tile>
          <mat-grid-tile><button mat-raised-button class="maintenance-button lookup-button" (click)="update('financeStanding','Finance Standing')"><span>Finance Standing</span></button></mat-grid-tile>
          <mat-grid-tile><button mat-raised-button class="maintenance-button lookup-button" (click)="update('financeTechnicalSplit','Finance Technical Split')"><span>Finance Technical Split</span></button></mat-grid-tile>
          <mat-grid-tile><button mat-raised-button class="maintenance-button lookup-button" (click)="update('fluctuation','Fluctuation')"><span>Fluctuation</span></button></mat-grid-tile>
          <mat-grid-tile><button mat-raised-button class="maintenance-button lookup-button" (click)="update('jvAgreement','JV Agreement')"><span>JV Agreement</span></button></mat-grid-tile>
          <mat-grid-tile><button mat-raised-button class="maintenance-button lookup-button" (click)="update('maintenanceDefect','Maintenance Defect')"><span>Maintenance Defect</span></button></mat-grid-tile>
          <mat-grid-tile><button mat-raised-button class="maintenance-button lookup-button" (click)="update('measurement','Measurement')"><span>Measurement</span></button></mat-grid-tile>
          <mat-grid-tile><button mat-raised-button class="maintenance-button lookup-button" (click)="update('region','Region')"><span>Region</span></button></mat-grid-tile>
          <mat-grid-tile><button mat-raised-button class="maintenance-button lookup-button" (click)="update('tenderType','Tender Type')"><span>Tender Type</span></button></mat-grid-tile>
        </mat-grid-list>
      </mat-card>

      <mat-card class="section-card system-card">
        <div class="section-header">
          <mat-icon class="section-icon">settings</mat-icon>
          <h3>System Maintenance</h3>
        </div>
        <p class="section-description">System configuration and administrative tasks</p>
        <mat-grid-list cols="4" rowHeight="85px" gutterSize="16px" class="button-grid">
          <mat-grid-tile><button mat-raised-button class="maintenance-button system-button" (click)="setTenderNo()"><span>Set Tender No</span></button></mat-grid-tile>
          <!-- <mat-grid-tile><button mat-raised-button class="maintenance-button system-button" (click)="migratePTS()"><span>Migrate From Old PTS</span></button></mat-grid-tile> -->
          <mat-grid-tile><button mat-raised-button class="maintenance-button system-button" (click)="updateTenderNoRunningNo()"><span>Next Tender No Maintenance</span></button></mat-grid-tile>
          <mat-grid-tile><button mat-raised-button class="maintenance-button system-button" (click)="others()"><span>Others</span></button></mat-grid-tile>
          <mat-grid-tile><button mat-raised-button class="maintenance-button system-button" (click)="tenderValueRemark()"><span>Tender Approximate Value</span></button></mat-grid-tile>
        </mat-grid-list>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 24px;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        min-height: 100vh;
      }

      .page-header {
        margin-bottom: 32px;
        padding-bottom: 24px;
        border-bottom: 2px solid rgba(0, 0, 0, 0.1);
      }

      .page-header h1 {
        margin: 0;
        font-size: 32px;
        font-weight: 600;
        color: #1976d2;
      }

      .page-header p {
        margin: 8px 0 0 0;
        color: #666;
        font-size: 14px;
      }

      .section-card {
        margin-bottom: 32px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 24px;
      }

      .system-card {
        background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
      }

      .section-header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }

      .section-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
        margin-right: 12px;
        color: #1976d2;
      }

      .system-card .section-icon {
        color: #f57c00;
      }

      .section-header h3 {
        margin: 0;
        font-size: 22px;
        font-weight: 600;
        color: #333;
      }

      .system-card .section-header h3 {
        color: #d84315;
      }

      .section-description {
        margin: 0 0 20px 40px;
        color: #777;
        font-size: 13px;
        font-style: italic;
      }

      .button-grid {
        margin: 0;
      }

      .maintenance-button {
        width: 100% !important;
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
        padding: 8px !important;
        border-radius: 6px !important;
        font-size: 12px !important;
        font-weight: 500 !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      }

      .lookup-button {
        background-color: #2196F3 !important;
        color: white !important;
      }

      .lookup-button:hover {
        background-color: #1976D2 !important;
        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4) !important;
        transform: translateY(-2px);
      }

      .lookup-button:active {
        transform: translateY(0);
      }

      .system-button {
        background-color: #FF9800 !important;
        color: white !important;
      }

      .system-button:hover {
        background-color: #F57C00 !important;
        box-shadow: 0 4px 12px rgba(255, 152, 0, 0.4) !important;
        transform: translateY(-2px);
      }

      .system-button:active {
        transform: translateY(0);
      }

      .maintenance-button span {
        display: block;
        line-height: 1.3;
      }

      @media (max-width: 1200px) {
        .button-grid {
          max-width: 100%;
        }

        mat-grid-list {
          max-width: 100%;
        }
      }

      @media (max-width: 768px) {
        .container {
          padding: 16px;
        }

        .page-header {
          margin-bottom: 24px;
        }

        .page-header h1 {
          font-size: 24px;
        }

        .section-card {
          margin-bottom: 20px;
          padding: 16px;
        }

        .section-header h3 {
          font-size: 18px;
        }

        :host ::ng-deep mat-grid-list {
          width: 100%;
        }
      }
    `,
  ],
})
export class LookupTablesComponent {
  constructor(private dialog: MatDialog) {}

  update(key: string, label: string): void {
    this.dialog.open(LookupTableDialogComponent, {
      width: '600px',
      data: {
        title: label,
        key: key,
        items: [], // Load from API or service
      },
    });
  }

  setTenderNo(): void {
    this.dialog.open(SetTenderNoComponent, {
      width: '900px',
      data: {},
    });
  }

  migratePTS(): void {
    this.dialog.open(MigrationComponent, {
      width: '700px',
      data: {},
    });
  }

  updateTenderNoRunningNo(): void {
    this.dialog.open(TenderNoRunningNoComponent, {
      width: '650px',
      data: {},
    });
  }

  others(): void {
    this.dialog.open(CancelApprovalComponent, {
      width: '500px',
      data: {},
    });
  }

  tenderValueRemark(): void {
    this.dialog.open(TenderValueRemarkComponent, {
      width: '900px',
      data: {},
    });
  }
}
