import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SystemConfigPopupComponent } from '../system-config-list-popup/system-config-popup.component';
import {
  SystemConfig,
  SystemConfigApiService,
} from '../../../../core/services/system-config-api.service';
@Component({
  selector: 'app-system-config-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="form-list-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>System Configuration</mat-card-title>
        </mat-card-header>
        <button mat-raised-button class="action-btn add-btn" (click)="openAddSystemConfigPopup()">
          Add
        </button>
        <mat-card-content>
          <div *ngIf="loading" class="loading-spinner">
            <mat-spinner diameter="40"></mat-spinner>
          </div>
          <div *ngIf="error" class="error-message">
            {{ error }}
          </div>
          <table
            *ngIf="!loading && !error"
            mat-table
            [dataSource]="dataSource"
            class="mat-elevation-z2"
            style="width: 100%;"
          >
            <!-- ID Column -->
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let element">{{ element.id }}</td>
            </ng-container>

            <!-- Key Column -->
            <ng-container matColumnDef="key">
              <th mat-header-cell *matHeaderCellDef>Key</th>
              <td mat-cell *matCellDef="let element">{{ element.key }}</td>
            </ng-container>

            <!-- Description Column -->
            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let element">{{ element.description }}</td>
            </ng-container>

            <!-- Value Column -->
            <ng-container matColumnDef="value">
              <th mat-header-cell *matHeaderCellDef>Value</th>
              <td mat-cell *matCellDef="let element">{{ element.value }}</td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let element">{{ element.status }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedColumns"
              (click)="openEditSystemConfigPopup(row)"
              style="cursor: pointer;"
            ></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .loading-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
      }
      .error-message {
        color: #f44336;
        text-align: center;
        padding: 1rem;
        font-size: 16px;
        background-color: #ffebee;
        border-radius: 4px;
        margin: 1rem;
      }
      .add-btn {
        background: linear-gradient(90deg, #1976d2 60%, #42a5f5 100%);
        color: #fff;
        font-weight: 600;
        border-radius: 24px;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.15);
        padding: 8px 28px;
        margin-left: auto;
        margin-bottom: 16px;
        transition: background 0.2s, box-shadow 0.2s;
      }
      .add-btn:hover {
        background: linear-gradient(90deg, #1565c0 60%, #1976d2 100%);
        box-shadow: 0 4px 16px rgba(25, 118, 210, 0.25);
      }
      .form-list-container {
        padding: 20px;
      }
      mat-card {
        margin: 0 auto;
        max-width: 100%;
        box-sizing: border-box;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(25, 118, 210, 0.12), 0 1.5px 6px rgba(0, 0, 0, 0.08);
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
        box-shadow: 0 4px 16px rgba(25, 118, 210, 0.13), 0 1.5px 6px rgba(0, 0, 0, 0.08);
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
    `,
  ],
})
export class SystemConfigListComponent {
  loading = false;
  error: string | null = null;
  displayedColumns: string[] = ['id', 'key', 'description', 'value', 'status'];
  dataSource: SystemConfig[] = [];

  constructor(
    private dialog: MatDialog,
    private systemConfigApiServiceSys: SystemConfigApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSystemConfigs();
  }

  loadSystemConfigs(): void {
    this.loading = true;
    this.error = null;
    this.systemConfigApiServiceSys.getSystemConfigs().subscribe({
      next: (data: SystemConfig[]) => {
        this.dataSource = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load system configurations. Please try again later.';
        this.loading = false;
        console.error('Error loading system configurations:', error);
      },
    });
  }

  openAddSystemConfigPopup() {
    const dialogRef = this.dialog.open(SystemConfigPopupComponent, {
      width: '600px',
      disableClose: true,
      data: { mode: 'add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.systemConfigApiServiceSys.createSystemConfig(result).subscribe({
          next: () => {
            this.loadSystemConfigs();
            this.snackBar.open('System configuration created successfully.', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          },
          error: (error) => {
            console.error('Error creating system configuration:', error);
            this.snackBar.open(
              'Failed to create system configuration. Please try again.',
              'Close',
              {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['error-snackbar'],
              }
            );
          },
        });
      }
    });
  }

  openEditSystemConfigPopup(systemConfig: SystemConfig): void {
    const dialogRef = this.dialog.open(SystemConfigPopupComponent, {
      width: '600px',
      disableClose: true,
      data: { mode: 'edit', systemConfig },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.systemConfigApiServiceSys.updateSystemConfig(result).subscribe({
          next: () => {
            this.loadSystemConfigs();
            this.snackBar.open('System configuration updated successfully.', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          },
          error: (error) => {
            console.error('Error updating system configuration:', error);
            this.snackBar.open(
              'Failed to update system configuration. Please try again.',
              'Close',
              {
                duration: 5000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['error-snackbar'],
              }
            );
          },
        });
      }
    });
  }
}
