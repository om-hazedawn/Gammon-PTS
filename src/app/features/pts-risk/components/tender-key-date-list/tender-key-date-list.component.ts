import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TenderKeyDateApiService, TenderKeyDate } from '../../../../core/services/tender.keydate-api.service';
import { TenderKeyDateComponent } from '../tender-key-date/tender-key-date.component';

@Component({
  selector: 'app-tender-key-date-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Tender Key Dates</mat-card-title>
        </mat-card-header>
        <div class="actions">
          <button mat-raised-button color="primary" (click)="onAddKeyDate()">
            <mat-icon>add</mat-icon>
            Add Key Date
          </button>
        </div>
        <mat-card-content>
          @if (error) {
            <div class="error-message">
              {{ error }}
            </div>
          }
          
          @if (loading) {
            <div class="loading-spinner">
              Loading...
            </div>
          }

          @if (keyDates.length > 0) {
            <table mat-table [dataSource]="keyDates" class="mat-elevation-z8">
              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Key Date Type</th>
                <td mat-cell *matCellDef="let date">{{ date.type }}</td>
              </ng-container>

              <ng-container matColumnDef="keyDate">
                <th mat-header-cell *matHeaderCellDef>Key Date</th>
                <td mat-cell *matCellDef="let date">{{ date.keyDate | date:'dd/MM/yyyy' }}</td>
              </ng-container>

              <ng-container matColumnDef="remark">
                <th mat-header-cell *matHeaderCellDef>Remark</th>
                <td mat-cell *matCellDef="let date">{{ date.remark }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          } @else {
            <div class="no-data">
              No key dates available
            </div>
          }

          <button mat-raised-button color="warn" (click)="onClose()">Close</button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .actions {
      margin: 16px 0;
      display: flex;
      justify-content: flex-end;
    }
    .mat-table {
      width: 100%;
      margin-top: 16px;
    }
    .error-message {
      color: red;
      margin-bottom: 16px;
    }
    .loading-spinner {
      text-align: center;
      margin: 20px 0;
    }
    .no-data {
      text-align: center;
      margin: 20px 0;
      color: #666;
    }
  `]
})
export class TenderKeyDateListComponent implements OnInit {
  keyDates: TenderKeyDate[] = [];
  loading = false;
  error: string | null = null;
  displayedColumns: string[] = ['type', 'keyDate', 'remark'];

  constructor(
    private keyDateService: TenderKeyDateApiService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { tenderId: number }
  ) {}

  ngOnInit(): void {
    this.loadKeyDates();
  }

  private loadKeyDates(): void {
    if (!this.data.tenderId) {
      this.error = 'Tender ID is required';
      return;
    }

    this.loading = true;
    this.error = null;

    this.keyDateService.getKeyDates(this.data.tenderId).subscribe({
      next: (dates) => {
        this.keyDates = dates;
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Error loading key dates:', error);
        this.error = error.message || 'Failed to load key dates. Please try again.';
        this.loading = false;
      }
    });
  }

  onAddKeyDate(): void {
    const dialogRef = this.dialog.open(TenderKeyDateComponent, {
      width: '600px',
      disableClose: true,
      data: { tenderId: this.data.tenderId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.loadKeyDates();
      }
    });
  }

  onClose(): void {
    this.dialog.closeAll();
  }
}
