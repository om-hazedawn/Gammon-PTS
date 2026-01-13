import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Form20MaintenanceService } from '../../../../core/services/Form20/form20Maintainance.service';

@Component({
  selector: 'app-lookup-table-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <h1 mat-dialog-title>{{ data['title'] }}</h1>
    <div mat-dialog-content class="dialog-content">
      <div *ngIf="isLoading" class="loading-container">
        <mat-spinner diameter="40"></mat-spinner>
        <p>Loading...</p>
      </div>
      <div *ngIf="!isLoading">
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let control of dataSource; let i = index">
                <td>
                  <input type="text" [formControl]="control" placeholder="Enter value" class="table-input">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button mat-raised-button color="primary" (click)="addItem()" class="add-button">
          <mat-icon>add</mat-icon> Add Item
        </button>
      </div>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="save()" [disabled]="isLoading">Save</button>
    </div>
  `,
  styles: [
    `
      h1[mat-dialog-title] {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 600;
      }

      .dialog-content {
        padding: 0 24px 24px 24px;
        max-width: 700px;
        min-width: 500px;
      }

      .loading-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 40px 0;
        min-height: 200px;
      }

      .loading-container p {
        margin-top: 16px;
        color: #666;
      }

      .table-container {
        margin-bottom: 16px;
        max-height: 400px;
        overflow-y: auto;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .data-table {
        width: 100%;
        border-collapse: collapse;
      }

      .data-table thead {
        background-color: #f5f5f5;
        position: sticky;
        top: 0;
      }

      .data-table th {
        padding: 12px;
        text-align: left;
        font-weight: 600;
        border-bottom: 2px solid #ddd;
        font-size: 13px;
      }

      .data-table td {
        padding: 10px 12px;
        border-bottom: 1px solid #eee;
        font-size: 13px;
      }

      .data-table tbody tr:hover {
        background-color: #fafafa;
      }

      .table-input {
        width: 100%;
        padding: 6px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 13px;
        font-family: Arial, sans-serif;
      }

      .table-input:focus {
        outline: none;
        border-color: #1976d2;
        box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
      }

      .add-button {
        margin-top: 12px;
      }

      [mat-dialog-actions] {
        padding-top: 16px;
        border-top: 1px solid #eee;
      }
    `,
  ],
})
export class LookupTableDialogComponent implements OnInit {
  displayedColumns: string[] = ['value'];
  dataSource: FormControl[] = [];
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private maintenanceService: Form20MaintenanceService,
    private dialogRef: MatDialogRef<LookupTableDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    if (!this.data['key']) {
      console.error('No table key provided');
      return;
    }

    this.isLoading = true;

    this.maintenanceService.getLookupTableData(this.data['key']).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('API Response:', response);
        console.log('Response Type:', typeof response);

        let items: string[] = [];

        // Check if response contains an array of items
        if (Array.isArray(response)) {
          console.log('Response is array');
          items = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          console.log('Response has data property');
          items = response.data;
        } else if (response && response.value && Array.isArray(response.value)) {
          console.log('Response has value property');
          items = response.value;
        } else if (response && typeof response === 'object') {
          console.log('Response is object, converting to array');
          items = Object.values(response);
        } else {
          console.log('No valid data found in response');
          items = [];
        }

        console.log('Parsed items:', items);

        if (items && items.length > 0) {
          this.dataSource = items.map((item: any) => new FormControl(item));
        } else {
          // Initialize with one empty field if no data
          this.dataSource = [new FormControl('')];
        }

        console.log('DataSource length:', this.dataSource.length);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading data:', error);
        // Initialize with empty field on error
        this.dataSource = [new FormControl('')];
      },
    });
  }

  addItem(): void {
    this.dataSource.push(new FormControl(''));
  }

  save(): void {
    const values = this.dataSource
      .map((control) => control.value)
      .filter((value) => value && value.trim() !== '');

    console.log('Saving values:', values);

    this.maintenanceService.saveLookupTableData(this.data['key'], values).subscribe({
      next: (response) => {
        console.log('Data saved successfully:', response);
        this.dialogRef.close(values);
      },
      error: (error) => {
        console.error('Error saving data:', error);
        // Still close dialog but show the error
        alert('Error saving data. Please try again.');
      },
    });
  }

  cancel(): void {
    console.log('Dialog cancelled');
    this.dialogRef.close();
  }
}
