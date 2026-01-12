import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-status-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
  ],
  template: `
    <div class="filter-dialog">
      <h2 mat-dialog-title>Filter by Tender Status</h2>
      <mat-dialog-content>
        <div class="status-list">
          @for (status of data.availableStatuses; track status) {
            <div class="status-option">
              <mat-checkbox
                [(ngModel)]="selectedStatuses[status]"
                (change)="onStatusChange(status, $event)"
              >
                {{ status }}
              </mat-checkbox>
            </div>
          }
        </div>
        @if (data.availableStatuses.length === 0) {
          <p class="no-statuses">No statuses available</p>
        }
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onClear()">Clear</button>
        <button mat-raised-button color="primary" (click)="onApply()">Apply</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .filter-dialog {
        min-width: 300px;
        padding: 0;
      }

      mat-dialog-content {
        padding: 20px;
        max-height: 400px;
        overflow-y: auto;
      }

      .status-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .status-option {
        display: flex;
        align-items: center;
      }

      .no-statuses {
        text-align: center;
        color: #999;
        padding: 20px;
      }

      mat-dialog-actions {
        padding: 16px 20px;
        border-top: 1px solid #e0e0e0;
      }

      h2 {
        margin: 0;
        padding: 16px 20px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 18px;
        font-weight: 500;
      }
    `,
  ],
})
export class StatusFilterComponent implements OnInit {
  selectedStatuses: { [key: string]: boolean } = {};

  constructor(
    public dialogRef: MatDialogRef<StatusFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      availableStatuses: string[];
      selectedStatuses: string[];
    }
  ) {}

  ngOnInit(): void {
    // Initialize the selected statuses object
    this.data.availableStatuses.forEach(status => {
      this.selectedStatuses[status] = this.data.selectedStatuses.includes(status);
    });
  }

  onStatusChange(status: string, event: any): void {
    this.selectedStatuses[status] = event.checked;
  }

  onApply(): void {
    const selected = Object.keys(this.selectedStatuses).filter(
      status => this.selectedStatuses[status]
    );
    this.dialogRef.close(selected);
  }

  onClear(): void {
    // Clear all selections
    Object.keys(this.selectedStatuses).forEach(status => {
      this.selectedStatuses[status] = false;
    });
    this.dialogRef.close([]);
  }
}
