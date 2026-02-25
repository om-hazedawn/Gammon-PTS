import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-status-toggle-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="toggle-popup-container">
      <div class="popup-content">
        @if (!data.isHidden) {
          <button 
            mat-raised-button 
            class="toggle-btn hide-btn"
            (click)="onToggle(true)"
          >
            <mat-icon>visibility_off</mat-icon>
            Hide Buttons
          </button>
        } @else {
          <button 
            mat-raised-button 
            class="toggle-btn show-btn"
            (click)="onToggle(false)"
          >
            <mat-icon>visibility</mat-icon>
            Show Buttons
          </button>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .toggle-popup-container {
        padding: 0;
        min-width: 150px;
      }
      
      .popup-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
      }
      
      .toggle-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 4px;
        font-weight: 500;
        font-size: 13px;
        transition: all 0.2s ease;
        cursor: pointer;
        text-transform: none;
        letter-spacing: 0;
      }
      
      .hide-btn {
        background-color: #ff9800;
        color: white;
      }
      
      .hide-btn:hover {
        background-color: #f57c00;
        box-shadow: 0 4px 8px rgba(255, 152, 0, 0.3);
      }
      
      .show-btn {
        background-color: #4caf50;
        color: white;
      }
      
      .show-btn:hover {
        background-color: #45a049;
        box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
      }
      
      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    `,
  ],
})
export class ChangeStatusToggleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangeStatusToggleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isHidden: boolean }
  ) {}

  onToggle(shouldHide: boolean): void {
    this.dialogRef.close(shouldHide);
  }
}
