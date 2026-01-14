import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface MigrationItem {
  tenderNo: string;
  status: string;
  statusIcon: string;
}

@Component({
  selector: 'app-migration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <h1 mat-dialog-title>Tender No Migration</h1>
    <div mat-dialog-content>
      <mat-card>
        <div class="input-row">
          <mat-form-field class="full-width">
            <input 
              [(ngModel)]="tenderList" 
              matInput 
              placeholder="Input tender numbers separated by ," 
              autocomplete="off" 
            />
          </mat-form-field>
          <button 
            mat-raised-button 
            color="primary" 
            (click)="startMigration()" 
            class="start-button"
          >
            Start
          </button>
        </div>
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
          <ng-container matColumnDef="tenderNo">
            <th mat-header-cell *matHeaderCellDef>Tender No</th>
            <td mat-cell *matCellDef="let element">
              {{element.tenderNo}}
            </td>
          </ng-container>
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let element">
              {{element.status}}
            </td>
          </ng-container>
          <ng-container matColumnDef="statusIcon">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">
              <mat-spinner diameter="30" *ngIf="element.statusIcon === 'processing'"></mat-spinner>
              <mat-icon 
                [color]="iconColor(element.statusIcon)"
                *ngIf="element.statusIcon !== 'processing'"
              >
                {{element.statusIcon}}
              </mat-icon>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="close()">Close</button>
    </div>
  `,
  styles: [
    `
      h1[mat-dialog-title] {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 600;
      }

      [mat-dialog-content] {
        padding: 0 24px 24px 24px;
        min-width: 600px;
      }

      mat-card {
        padding: 20px;
      }

      .input-row {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;
      }

      .full-width {
        flex: 1;
      }

      .start-button {
        margin-top: 0;
      }

      table {
        width: 100%;
        max-height: 400px;
        overflow-y: auto;
      }

      th.mat-header-cell {
        font-weight: 600;
        font-size: 14px;
      }

      td.mat-cell {
        font-size: 13px;
      }

      mat-icon {
        vertical-align: middle;
      }

      mat-spinner {
        display: inline-block;
      }

      [mat-dialog-actions] {
        padding-top: 16px;
        border-top: 1px solid #eee;
      }
    `,
  ],
})
export class MigrationComponent {
  tenderList = '';
  displayedColumns: string[] = ['tenderNo', 'status', 'statusIcon'];
  dataSource: MigrationItem[] = [];

  constructor(private dialogRef: MatDialogRef<MigrationComponent>) {}

  startMigration(): void {
    if (!this.tenderList.trim()) {
      return;
    }

    // Parse tender numbers from comma-separated input
    const tenderNumbers = this.tenderList
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    // Initialize data source with processing status
    this.dataSource = tenderNumbers.map(tenderNo => ({
      tenderNo,
      status: 'Processing...',
      statusIcon: 'processing',
    }));

    // Simulate migration process for each tender
    tenderNumbers.forEach((tenderNo, index) => {
      setTimeout(() => {
        // Simulate success/failure randomly (replace with actual API call)
        const success = Math.random() > 0.3;
        this.dataSource[index] = {
          tenderNo,
          status: success ? 'Completed successfully' : 'Failed',
          statusIcon: success ? 'check_circle' : 'error',
        };
      }, 1000 + index * 500);
    });
  }

  iconColor(icon: string): string {
    if (icon === 'check_circle') {
      return 'primary';
    } else if (icon === 'error') {
      return 'warn';
    }
    return '';
  }

  close(): void {
    this.dialogRef.close();
  }
}
