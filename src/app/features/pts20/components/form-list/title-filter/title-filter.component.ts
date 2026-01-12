import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-title-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  template: `
    <div class="filter-dialog">
      <h2 mat-dialog-title>Search by Title</h2>
      <mat-dialog-content>
        <div class="search-container">
          <input 
            type="text"
            class="search-input"
            [(ngModel)]="searchText" 
            placeholder="Enter title keyword..."
            (keyup.enter)="onApply()"
          >
        </div>
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
        min-width: 350px;
        padding: 0;
      }

      mat-dialog-content {
        padding: 20px;
        max-height: 300px;
        overflow-y: auto;
      }

      .search-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .search-input {
        padding: 12px 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        font-family: inherit;
        transition: all 0.2s ease;
      }

      .search-input:focus {
        outline: none;
        border-color: #1976d2;
        box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
      }

      .search-input::placeholder {
        color: #999;
      }

      mat-dialog-actions {
        padding: 16px 20px;
        border-top: 1px solid #e0e0e0;
        gap: 8px;
      }

      h2 {
        margin: 0;
        padding: 16px 20px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 18px;
        font-weight: 500;
        color: #1976d2;
      }

      button {
        min-width: 80px;
        border-radius: 4px;
        font-weight: 500;
      }

      button[mat-button] {
        color: #666;
      }

      button[mat-raised-button] {
        box-shadow: 0 2px 4px rgba(25, 118, 210, 0.1);
      }

      button[mat-raised-button]:hover {
        box-shadow: 0 4px 8px rgba(25, 118, 210, 0.15);
      }
    `,
  ],
})
export class TitleFilterComponent implements OnInit {
  searchText: string = '';

  constructor(
    public dialogRef: MatDialogRef<TitleFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      searchText: string;
    }
  ) {}

  ngOnInit(): void {
    this.searchText = this.data.searchText || '';
  }

  onApply(): void {
    this.dialogRef.close(this.searchText);
  }

  onClear(): void {
    this.searchText = '';
    this.dialogRef.close('');
  }
}
