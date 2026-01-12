import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-tender-no-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
  ],
  template: `
    <div class="filter-dialog">
      <h2 mat-dialog-title>Filter Tender No</h2>
      <mat-dialog-content>
        <div class="filter-container">
          <div class="search-section">
            <label>Search Tender No</label>
            <input 
              type="text"
              class="search-input"
              [(ngModel)]="searchText" 
              placeholder="Enter tender number..."
              (keyup.enter)="onApply()"
            >
          </div>

          <div class="sort-section">
            <label>Sort Order</label>
            <div class="radio-group">
              <mat-radio-button 
                value="ascending" 
                [(ngModel)]="sortOrder"
                name="sortOrder"
              >
                Ascending (A to Z)
              </mat-radio-button>
              <mat-radio-button 
                value="descending" 
                [(ngModel)]="sortOrder"
                name="sortOrder"
              >
                Descending (Z to A)
              </mat-radio-button>
            </div>
          </div>
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
        max-height: 400px;
        overflow-y: auto;
      }

      .filter-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .search-section,
      .sort-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      label {
        font-weight: 600;
        color: #1976d2;
        font-size: 14px;
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

      .radio-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-left: 8px;
      }

      mat-radio-button {
        font-size: 14px;
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
export class TenderNoFilterComponent implements OnInit {
  searchText: string = '';
  sortOrder: string = 'ascending';

  constructor(
    public dialogRef: MatDialogRef<TenderNoFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      searchText: string;
      sortOrder: string;
    }
  ) {}

  ngOnInit(): void {
    this.searchText = this.data.searchText || '';
    this.sortOrder = this.data.sortOrder || 'ascending';
  }

  onApply(): void {
    this.dialogRef.close({
      searchText: this.searchText,
      sortOrder: this.sortOrder
    });
  }

  onClear(): void {
    this.searchText = '';
    this.sortOrder = 'ascending';
    this.dialogRef.close({
      searchText: '',
      sortOrder: 'ascending'
    });
  }
}
