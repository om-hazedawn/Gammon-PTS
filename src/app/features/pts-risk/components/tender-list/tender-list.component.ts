import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcomDecisionPopupComponent } from '../excom-decision-popup/excom-decision-popup.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tender-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    ExcomDecisionPopupComponent,
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Tender Risk Management</mat-card-title>
          <mat-card-subtitle>Risk assessment for tenders</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="dataSource" class="mat-elevation-z2" style="width: 100%;">
            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let element">{{ element.status }}</td>
            </ng-container>

            <!-- Division Column -->
            <ng-container matColumnDef="division">
              <th mat-header-cell *matHeaderCellDef>Division</th>
              <td mat-cell *matCellDef="let element">{{ element.division }}</td>
            </ng-container>

            <!-- Expected Tender Submission Date Column -->
            <ng-container matColumnDef="expectedDate">
              <th mat-header-cell *matHeaderCellDef>
                Expected Tender<br />Submission Date
              </th>
              <td mat-cell *matCellDef="let element">{{ element.expectedDate | date }}</td>
            </ng-container>

            <!-- Bidding Gammon Entity Column -->
            <ng-container matColumnDef="entity">
              <th mat-header-cell *matHeaderCellDef>Bidding Gammon Entity</th>
              <td mat-cell *matCellDef="let element">{{ element.entity }}</td>
            </ng-container>

            <!-- Project Name Column -->
            <ng-container matColumnDef="projectName">
              <th mat-header-cell *matHeaderCellDef>Project Name</th>
              <td mat-cell *matCellDef="let element">{{ element.projectName }}</td>
            </ng-container>

            <!-- Currency Column -->
            <ng-container matColumnDef="currency">
              <th mat-header-cell *matHeaderCellDef>Currency</th>
              <td mat-cell *matCellDef="let element">{{ element.currency }}</td>
            </ng-container>

            <!-- Estimated Tender Value (Million) Column -->
            <ng-container matColumnDef="estimatedValue">
              <th mat-header-cell *matHeaderCellDef>
                Estimated Tender Value<br />(Million)
              </th>
              <td mat-cell *matCellDef="let element">{{ element.estimatedValue }}</td>
            </ng-container>

            <!-- Response Column -->
            <ng-container matColumnDef="response">
              <th mat-header-cell *matHeaderCellDef>Response</th>
              <td mat-cell *matCellDef="let element">{{ element.response }}</td>
            </ng-container>

            <!-- Up/Downgrade Column -->
            <ng-container matColumnDef="upDowngrade">
              <th mat-header-cell *matHeaderCellDef>Up/Downgrade</th>
              <td mat-cell *matCellDef="let element">{{ element.upDowngrade }}</td>
            </ng-container>

            <!-- Additional Note Column -->
            <ng-container matColumnDef="additionalNote">
              <th mat-header-cell *matHeaderCellDef>Additional Note</th>
              <td mat-cell *matCellDef="let element">{{ element.additionalNote }}</td>
            </ng-container>

            <!-- EXCOM Decision Column -->
            <ng-container matColumnDef="excomDecision">
              <th mat-header-cell *matHeaderCellDef>EXCOM Decision</th>
              <td mat-cell *matCellDef="let element">
                <button mat-icon-button color="primary" aria-label="Edit EXCOM Decision" (click)="openExcomDecisionPopup()">
                  <mat-icon style="color: #1976d2;">edit</mat-icon>
                </button>
              </td>
            </ng-container>

            <!-- Market Intelligence Column -->
            <ng-container matColumnDef="marketIntelligence">
              <th mat-header-cell *matHeaderCellDef>Market<br />Intelligence</th>
              <td mat-cell *matCellDef="let element">
                <button mat-icon-button color="primary" aria-label="Edit Market Intelligence">
                  <mat-icon style="color: #1976d2;">edit</mat-icon>
                </button>
              </td>
            </ng-container>

            <!-- Change Status for Tender Column -->
            <ng-container matColumnDef="changeStatus">
              <th mat-header-cell *matHeaderCellDef>
                Change Status for Tender
              </th>
              <td mat-cell *matCellDef="let element">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                  <button mat-raised-button class="action-btn">No need for Excom approval</button>
                  <button mat-raised-button class="action-btn">work in View (pending Tender Doc Released)</button>
                  <button mat-raised-button class="action-btn green">Weekly Snapshot</button>
                  <button mat-raised-button class="action-btn green">Monthly Snapshot</button>
                </div>
              </td>
            </ng-container>

            <!-- Key Date Column -->
            <ng-container matColumnDef="keyDate">
              <th mat-header-cell *matHeaderCellDef>Key Date</th>
              <td mat-cell *matCellDef="let element">
                <button mat-icon-button color="primary" (click)="picker.open()">
                  <mat-icon style="color: #1976d2;">calendar_today</mat-icon>
                </button>
                <mat-datepicker #picker></mat-datepicker>
              </td>
            </ng-container>

            <!-- Form 20 Column -->
            <ng-container matColumnDef="form20">
              <th mat-header-cell *matHeaderCellDef>
                Form<br />20
              </th>
              <td mat-cell *matCellDef="let element">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                  <button mat-stroked-button color="primary" class="form-btn">Add</button>
                  <button mat-stroked-button color="primary" class="form-btn">Select</button>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 0;
        margin: 0;
        width: 100%;
        box-sizing: border-box;
        overflow-x: auto;
      }
      mat-card {
        margin: 0 auto;
        max-width: 100%;
        box-sizing: border-box;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(25, 118, 210, 0.12), 0 1.5px 6px rgba(0,0,0,0.08);
        overflow-x: auto;
      }
      .mat-card-content {
        padding: 0 !important;
        border-radius: 0 0 16px 16px;
        overflow-x: auto;
      }
      table {
        width: 100%;
        min-width: 600px;
        max-width: 100%;
        overflow-x: auto;
        display: table;
        margin: 0;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(25, 118, 210, 0.13), 0 1.5px 6px rgba(0,0,0,0.08);
        border-collapse: separate;
        border-spacing: 0;
      }
      th {
        background-color: #f5f7fa;
        color: #1976d2;
        font-weight: bold;
        white-space: normal;
        word-break: keep-all;
        line-height: 1.2;
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        max-width: 120px;
        overflow-wrap: break-word;
        border-bottom: 2px solid #e0e0e0;
      }
      td {
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        padding: 14px 12px;
        background-color: #fff;
        font-size: 15px;
        border-bottom: 1px solid #e0e0e0;
      }
      tr.mat-row:nth-child(even) td {
        background-color: #f5f7fa;
      }
      tr.mat-row:hover td {
        background-color: #e3f2fd;
        transition: background 0.2s;
      }
      mat-form-field {
        font-size: 13px;
      }
      .mat-form-field-appearance-outline .mat-form-field-infix {
        padding: 0 8px;
      }
      .mat-form-field-appearance-outline .mat-form-field-wrapper {
        padding-bottom: 0;
      }
      .action-btn {
        min-width: 110px;
        margin: 2px 6px 2px 0;
        border-radius: 8px;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
        transition: background 0.2s, box-shadow 0.2s;
        background-color: var(--primary-color) !important;
        color: #fff !important;
      }
      .action-btn.green {
        background-color: #43a047 !important;
        color: #fff !important;
      }
      .action-btn:last-child {
        margin-right: 0;
      }
      .action-btn:hover:not([disabled]) {
        box-shadow: 0 4px 16px rgba(25, 118, 210, 0.15);
      }
      .form-btn {
        min-width: 80px;
        margin: 2px 6px 2px 0;
        border-radius: 8px;
        font-weight: 500;
        transition: background 0.2s, box-shadow 0.2s;
      }
      .form-btn:hover:not([disabled]) {
        background: #43a047 !important;
        color: #fff !important;
      }
    `,
  ],
})
export class TenderListComponent {
  constructor(private dialog: MatDialog) {}

  openExcomDecisionPopup(): void {
    this.dialog.open(ExcomDecisionPopupComponent, {
      width: '900px',
      maxWidth: 'none',
      disableClose: false,
    });
  }
  displayedColumns: string[] = [
    'status',
    'division',
    'expectedDate',
    'entity',
    'projectName',
    'currency',
    'estimatedValue',
    'response',
    'upDowngrade',
    'additionalNote',
    'excomDecision',
    'marketIntelligence',
    'changeStatus',
    'keyDate',
    'form20',
  ];

  dataSource = [
    {
      id: 1,
      status: 'No need for EXCOM approval',
      division: 'Civil',
      expectedDate: new Date(),
      entity: 'Gammon India',
      projectName: 'Metro Project',
      currency: 'INR',
      estimatedValue: 120,
      response: 'Positive',
      upDowngrade: 'Upgrade',
      additionalNote: 'High priority',
      keyDate: null,
    },
    {
      id: 2,
      status: 'Open',
      division: 'Civil',
      expectedDate: new Date(),
      entity: 'Gammon India',
      projectName: 'Metro Project',
      currency: 'INR',
      estimatedValue: 120,
      response: 'Positive',
      upDowngrade: 'Upgrade',
      additionalNote: 'High priority',
      keyDate: null,
    },
  ];
}
