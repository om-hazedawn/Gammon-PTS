import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-status-menu-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="menu-container">
      <div class="menu-content">
        @for (option of data.options; track option.status) {
          <button 
            mat-raised-button 
            class="menu-item"
            [ngClass]="getButtonClass(option.status)"
            (click)="selectOption(option)"
          >
            {{ option.label }}
          </button>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .menu-container {
        padding: 0;
        min-width: 200px;
      }
      
      .menu-content {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 12px;
      }
      
      .menu-item {
        text-align: center;
        padding: 8px 12px;
        border-radius: 6px;
        font-weight: 500;
        font-size: 12px;
        transition: all 0.2s ease;
        background-color: #1976d2 !important;
        color: #fff !important;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08) !important;
        text-transform: none;
        letter-spacing: 0;
        min-height: auto;
      }
      
      .menu-item:hover:not([disabled]) {
        box-shadow: 0 4px 16px rgba(25, 118, 210, 0.15) !important;
      }
      
      .menu-item.green {
        background-color: #43a047 !important;
      }
      
      .menu-item.green:hover:not([disabled]) {
        box-shadow: 0 4px 16px rgba(67, 160, 71, 0.15) !important;
      }
      
      .menu-item.red {
        background-color: #e53935 !important;
      }
      
      .menu-item.red:hover:not([disabled]) {
        box-shadow: 0 4px 16px rgba(229, 57, 53, 0.15) !important;
      }
    `,
  ],
})
export class ChangeStatusMenuDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangeStatusMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { options: Array<{ status: string; label: string }> }
  ) {}

  selectOption(option: { status: string; label: string }): void {
    this.dialogRef.close(option.status);
  }

  getButtonClass(status: string): string {
    if (['Weekly Snapshot', 'Monthly Snapshot'].includes(status)) {
      return 'green';
    }
    if (['Withdraw / Declined', 'Expired'].includes(status)) {
      return 'red';
    }
    return '';
  }
}

